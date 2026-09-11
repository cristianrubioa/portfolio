import type { Project } from './projects';

export type LinkCategory = 'repo' | 'blog' | 'domain' | 'paper';

type SatelliteLink = {
  label: Project['links'][number]['label'];
  url: string;
  sourceKey: string;
  category: LinkCategory;
};

export type GraphNode = {
  id: string;
  kind: 'project' | 'satellite' | 'hub';
  url?: string;
  icon?: string;
  label?: string;
  sourceKey?: string;
  category?: LinkCategory;
  links?: SatelliteLink[];
};

export type GraphLink = {
  source: string;
  target: string;
};

export type GraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

// Font Awesome 6 Free Solid glyph codepoints (font already loaded in
// Layout.astro) - drawn directly on canvas, no CSS class rendering there.
const LINK_ICON: Record<Project['links'][number]['label'], string> = {
  'Live demo': String.fromCharCode(0xf519), // fa-tower-broadcast
  GitHub: String.fromCharCode(0xf126), // fa-code-branch
  'Blog post': String.fromCharCode(0xf1ea), // fa-newspaper
  Paper: String.fromCharCode(0xf15c), // fa-file-lines
};

const PROJECT_ICON = String.fromCharCode(0xf542); // fa-diagram-project
const HUB_ICON = String.fromCharCode(0xf5fd); // fa-layer-group

const LINK_CATEGORY: Record<Project['links'][number]['label'], LinkCategory> = {
  GitHub: 'repo',
  'Blog post': 'blog',
  'Live demo': 'domain',
  Paper: 'paper',
};

// Friendly names for source keys known ahead of time; anything else falls
// back to its raw sourceKey rather than guessing a category from its shape.
const HUB_LABEL: Record<string, string> = {
  cristianrubioa: 'Repos',
  'blog.crubio.fyi': 'Blog',
};

// Hub hover tooltips; a source key with no entry here shows no tooltip -
// there's no sensible raw-key fallback for a description like there is for
// HUB_LABEL.
const HUB_DESCRIPTION: Record<string, string> = {
  cristianrubioa: 'All GitHub repos by the same author',
  'blog.crubio.fyi': 'Posts published on the blog',
};

const BLOG_LINK_MAX = 35;

// GitHub links are grouped by repo owner ("same author"), not by bare
// hostname ("hosted on GitHub", which says nothing) - see design.md.
export function sourceKeyFor(link: Project['links'][number]): string {
  const url = new URL(link.url);
  if (url.hostname === 'github.com') {
    const owner = url.pathname.split('/').filter(Boolean)[0];
    if (owner) return owner;
  }
  return url.hostname;
}

function repoNameFromUrl(url: string): string | undefined {
  return new URL(url).pathname.split('/').filter(Boolean)[1];
}

function stripLink(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

// Shared by a satellite's own tooltip and a project's aggregated tooltip -
// one implementation guarantees they always agree, per design.md.
function satelliteLine(n: Pick<SatelliteLink, 'url' | 'category' | 'sourceKey'>): string {
  switch (n.category) {
    case 'domain':
      return n.sourceKey;
    case 'repo':
      return `@${n.sourceKey}/${repoNameFromUrl(n.url)}`;
    case 'blog': {
      const stripped = stripLink(n.url);
      return stripped.length > BLOG_LINK_MAX ? `${stripped.slice(0, BLOG_LINK_MAX)}...` : stripped;
    }
    case 'paper':
      return '';
  }
}

// Structured version of a project's links, for a click-to-pin panel that
// styles the label/value parts differently (nodeLabelFor's joined HTML
// string doesn't distinguish them).
export function projectLinkLines(
  node: GraphNode,
): { label: string; line: string; url: string }[] {
  if (node.kind !== 'project' || !node.links) return [];
  return node.links
    .map((link) => ({ label: link.label, line: satelliteLine(link), url: link.url }))
    .filter((l) => l.line);
}

export function nodeLabelFor(node: GraphNode): string {
  if (node.kind === 'satellite') {
    if (!node.url || !node.category || !node.sourceKey) return '';
    return satelliteLine({ url: node.url, category: node.category, sourceKey: node.sourceKey });
  }
  if (node.kind === 'hub') {
    return (node.sourceKey && HUB_DESCRIPTION[node.sourceKey]) || '';
  }
  if (node.kind === 'project' && node.links) {
    return node.links
      .map((link) => {
        const line = satelliteLine(link);
        return line ? `${link.label}: ${line}` : '';
      })
      .filter(Boolean)
      .join('<br>');
  }
  return '';
}

export function toGraphData(projects: Project[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const project of projects) {
    const projectNodeId = `project:${project.id}`;
    const projectLinks: SatelliteLink[] = project.links.map((link) => ({
      label: link.label,
      url: link.url,
      sourceKey: sourceKeyFor(link),
      category: LINK_CATEGORY[link.label],
    }));
    nodes.push({
      id: projectNodeId,
      kind: 'project',
      icon: PROJECT_ICON,
      label: project.title,
      links: projectLinks,
    });

    projectLinks.forEach((link, index) => {
      const satelliteId = `satellite:${project.id}:${index}`;
      nodes.push({
        id: satelliteId,
        kind: 'satellite',
        url: link.url,
        icon: LINK_ICON[link.label],
        sourceKey: link.sourceKey,
        category: link.category,
      });
      links.push({ source: projectNodeId, target: satelliteId });
    });
  }

  return { nodes, links };
}

// A hub only forms for a source shared by 2+ satellites - a source used
// once doesn't group with anything, so it stays a plain satellite.
export function computeHubs(nodes: GraphNode[]): GraphData {
  const bySource = new Map<string, GraphNode[]>();
  for (const node of nodes) {
    if (node.kind !== 'satellite' || !node.sourceKey) continue;
    const group = bySource.get(node.sourceKey) ?? [];
    group.push(node);
    bySource.set(node.sourceKey, group);
  }

  const hubNodes: GraphNode[] = [];
  const hubLinks: GraphLink[] = [];
  for (const [sourceKey, satellites] of bySource) {
    if (satellites.length < 2) continue;
    const hubId = `hub:${sourceKey}`;
    hubNodes.push({
      id: hubId,
      kind: 'hub',
      icon: HUB_ICON,
      label: HUB_LABEL[sourceKey] ?? sourceKey,
      sourceKey,
    });
    for (const satellite of satellites) {
      hubLinks.push({ source: hubId, target: satellite.id });
    }
  }

  return { nodes: hubNodes, links: hubLinks };
}
