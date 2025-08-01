"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const THEMES = {
  light: {
    background: "hsl(0 0% 100%)",
    foreground: "hsl(222.2 84% 4.9%)",
    muted: "hsl(210 40% 96%)",
    mutedForeground: "hsl(215.4 16.3% 46.9%)",
    border: "hsl(214.3 31.8% 91.4%)",
    input: "hsl(214.3 31.8% 91.4%)",
    primary: "hsl(222.2 47.4% 11.2%)",
    primaryForeground: "hsl(210 40% 98%)",
    secondary: "hsl(210 40% 96%)",
    secondaryForeground: "hsl(222.2 47.4% 11.2%)",
    accent: "hsl(210 40% 96%)",
    accentForeground: "hsl(222.2 47.4% 11.2%)",
    destructive: "hsl(0 84.2% 60.2%)",
    destructiveForeground: "hsl(210 40% 98%)",
    ring: "hsl(215 20.2% 65.1%)",
    chart: {
      "1": "hsl(12 76% 61%)",
      "2": "hsl(173 58% 39%)",
      "3": "hsl(197 37% 24%)",
      "4": "hsl(43 74% 66%)",
      "5": "hsl(27 87% 67%)",
    },
  },
  dark: {
    background: "hsl(222.2 84% 4.9%)",
    foreground: "hsl(210 40% 98%)",
    muted: "hsl(217.2 32.6% 17.5%)",
    mutedForeground: "hsl(215 20.2% 65.1%)",
    border: "hsl(217.2 32.6% 17.5%)",
    input: "hsl(217.2 32.6% 17.5%)",
    primary: "hsl(210 40% 98%)",
    primaryForeground: "hsl(222.2 47.4% 11.2%)",
    secondary: "hsl(217.2 32.6% 17.5%)",
    secondaryForeground: "hsl(210 40% 98%)",
    accent: "hsl(217.2 32.6% 17.5%)",
    accentForeground: "hsl(210 40% 98%)",
    destructive: "hsl(0 62.8% 30.6%)",
    destructiveForeground: "hsl(0 85.7% 97.3%)",
    ring: "hsl(217.2 32.6% 17.5%)",
    chart: {
      "1": "hsl(220 70% 50%)",
      "2": "hsl(160 60% 45%)",
      "3": "hsl(30 80% 55%)",
      "4": "hsl(280 65% 60%)",
      "5": "hsl(340 75% 55%)",
    },
  },
} as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextProps>({
  config: {},
})

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a ChartProvider")
  }
  return context
}

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const theme = THEMES.dark
  const cssVars = Object.entries(config).reduce((acc, [key, value]) => {
    const color = "color" in value ? value.color : theme.chart[key as keyof typeof theme.chart]
    if (color) {
      return {
        ...acc,
        [`--color-${key}`]: color,
      }
    }
    return acc
  }, {} as Record<string, string>)

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
          [data-chart="${id}"] {
            ${Object.entries(cssVars)
              .map(([key, value]) => `${key}: ${value};`)
              .join("\n")}
          }
        `,
      }}
    />
  )
}

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ config, children, className, ...props }, ref) => {
    const id = React.useId()
    return (
      <ChartContext.Provider value={{ config }}>
        <div
          ref={ref}
          data-chart={id}
          className={cn("space-y-4", className)}
          {...props}
        >
          <ChartStyle id={id} config={config} />
          {children}
        </div>
      </ChartContext.Provider>
    )
  }
)
Chart.displayName = "Chart"

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    value?: number | string
    dataKey?: string
    name?: string
    color?: string
    payload?: any
  }>
  className?: string
  indicator?: "dot" | "line"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string | React.ReactNode
  labelFormatter?: (value: any, payload: any[]) => React.ReactNode
  labelClassName?: string
  formatter?: (value: any, name: string, props: any, index: number, payload: any) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}

const ChartTooltip = React.forwardRef<HTMLDivElement, ChartTooltipProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        )
      }

      if (!value) {
        return null
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        )}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload?.fill || item.color

            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                )}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]",
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "w-1": indicator === "line",
                            }
                          )}
                          style={{
                            "--color-border": indicatorColor,
                            "--color-bg": indicatorColor,
                          } as React.CSSProperties}
                        />
                      )
                    )}
                    <div className="grid flex-1 gap-0.5">
                      <div className="text-xs text-muted-foreground">
                        {itemConfig?.label || item.name}
                      </div>
                      <div className="text-xs font-medium">
                        {typeof item.value === "number"
                          ? item.value.toLocaleString()
                          : item.value}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ChartTooltip.displayName = "ChartTooltip"

function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  return config[key]
}

export { Chart, ChartTooltip, useChart }
