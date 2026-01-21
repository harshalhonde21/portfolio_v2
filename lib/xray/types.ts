/**
 * X-Ray Architecture Types
 * Type definitions for the architecture visualization system
 */

/** Component rendering type */
export type ComponentType = 'client' | 'server' | 'shared' | 'effects';

/** Data source type */
export type DataSource = 'static' | 'dynamic' | 'hybrid';

/** Layer category for grouping and connectors */
export type Layer = 'content' | 'layout' | 'effects';

/** Section architecture metadata */
export interface SectionMeta {
  /** DOM section id (must match id attribute) */
  id: string;
  /** Display label for annotation */
  label: string;
  /** Component rendering type */
  componentType: ComponentType;
  /** Data source type */
  dataSource: DataSource;
  /** One-line rationale for architecture choice */
  rationale: string;
  /** Layer category */
  layer: Layer;
  /** Related section ids for connector lines */
  dependencies?: string[];
  /** Position for label (default: 'top-left') */
  labelPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/** X-Ray context state */
export interface XRayState {
  enabled: boolean;
  hoveredSection: string | null;
}

/** Label display text mapping */
export const COMPONENT_TYPE_LABELS: Record<ComponentType, string> = {
  client: 'Client Component',
  server: 'Server Component',
  shared: 'Shared UI',
  effects: 'Effects Layer',
};

/** Color mapping for component types */
export const COMPONENT_TYPE_COLORS: Record<ComponentType, string> = {
  client: 'neon-cyan',
  server: 'neon-green',
  shared: 'neon-purple',
  effects: 'neon-magenta',
};

/** Data source labels */
export const DATA_SOURCE_LABELS: Record<DataSource, string> = {
  static: 'Static Data',
  dynamic: 'Dynamic Data',
  hybrid: 'Static + Dynamic',
};
