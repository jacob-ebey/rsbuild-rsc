import type { RsbuildPlugin, Rspack } from "@rsbuild/core";

export function withGraph({
  applyToEnvironments,
  graphs,
}: {
  applyToEnvironments: string[];
  graphs: Record<string, Rspack.RuleSetRule["resolve"]>;
}): RsbuildPlugin {
  const applyToEnvironmentsSet = new Set(applyToEnvironments);

  return {
    name: "with-env",
    setup(api) {
      api.modifyRspackConfig((config, { environment, mergeConfig }) => {
        if (!applyToEnvironmentsSet.has(environment.name)) {
          return config;
        }

        const rules = Object.entries(graphs).flatMap(
          ([graph, options]): Rspack.RuleSetRule[] => {
            const configRule: Rspack.RuleSetRule = {
              layer: graph,
              resolve: options,
            };
            return [
              {
                ...configRule,
                with: { graph },
              },
              {
                ...configRule,
                issuerLayer: graph,
              },
            ];
          }
        );

        return mergeConfig(config, {
          experiments: {
            layers: true,
          },
          module: {
            rules,
          },
        });
      });
    },
  };
}
