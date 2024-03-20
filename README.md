# Liquid

I couldn't figure out how to show liquidity over time on dexscreener, so welcome to liquid, a flexible real time data viewer for dex info based on the dexscreener API.

Check it out [here](liquid-omega.vercel.app)

![Screenshot 2024-03-20 123445](https://github.com/tith3/liquid/assets/153851657/2962060e-13d0-4b7b-928b-8f712e52bc11)

## Usage

Get the token address for the pair you're interested in then go!

### Pane Configuration

In the settings you will find pane settings. They should be self explanatory however in case they're not.

-Rows: the number of rows of panes.

-Cols: the number of columns of panes.

-Priority vert: prioritize stacking panes before putting them side by side. i.e. make new rows before new columns.

-Priority hori: prioritize putting panes side by side before stacking them. i.e. make new columns before new rows.

Though simple, these settings in addition to resizing the panes give a high level of control over the layout of your graphs.

This is a work in progress and early days at that! Many more features to come but it may feel a little jank atm.

## Roadmap

-Pair explorer

-More advanced graph features (very basic atm)

-Graph desync (different tokens on different graph, independant time series and movement)

-Use pair or token address (currently only token address)

-More data options 

-More display options (candlestick, tables for table data)


