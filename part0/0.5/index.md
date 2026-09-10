<h2 align="center">SPA Flowchart</h2>

```mermaid

flowchart TD
    subgraph Browser
        B1(Request https://studies.cs.helsinki.fi/exampleapp/spa)
        B2(Self-execute JS code)
        B3(Request JSON data file)
        B4(Redraw Notes)
    end

    subgraph Server
        S1(Return HTML, CSS, and JS files)
        S2(Return JSON data)
    end

    %% Process Flow Connections
    B1 --> S1
    S1 --> B2
    B2 --> B3
    B3 --> S2
    S2 --> B4
```