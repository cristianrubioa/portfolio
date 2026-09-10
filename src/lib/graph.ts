import type { Project } from './projects';

export type LinkCategory = 'repo' | 'blog' | 'domain' | 'paper';

export type GraphNode = {
  id: string;
  kind: 'project' | 'satellite' | 'hub';
  url?: string;
  icon?: string;
  label?: string;
  sourceKey?: string;
  category?: LinkCategory;
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

export function toGraphData(projects: Project[]): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const project of projects) {
    const projectNodeId = `project:${project.id}`;
    nodes.push({
      id: projectNodeId,
      kind: 'project',
      icon: PROJECT_ICON,
      label: project.title,
    });

    project.links.forEach((link, index) => {
      const satelliteId = `satellite:${project.id}:${index}`;
      nodes.push({
        id: satelliteId,
        kind: 'satellite',
        url: link.url,
        icon: LINK_ICON[link.label],
        sourceKey: sourceKeyFor(link),
        category: LINK_CATEGORY[link.label],
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
    });
    for (const satellite of satellites) {
      hubLinks.push({ source: hubId, target: satellite.id });
    }
  }

  return { nodes: hubNodes, links: hubLinks };
}
