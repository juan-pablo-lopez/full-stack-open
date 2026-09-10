<h2 align="center">New Note SPA Flowchart</h2>

```mermaid

flowchart TD
    subgraph User
        U1(Writes in textbox)
        U2(Clicks Save)
        U1 --> U2
    end

    subgraph Browser
        B1(Request https://studies.cs.helsinki.fi/exampleapp/spa)
        B2(Self-execute JS code)
        B3(Request JSON data file)
        B4(Redraw Notes)
        B5(Creates Note element)
        B6(Add Note to UL)
        B7(Redraw Notes)
        Note1[New Note appears now, before sending!]
        Note1 -.- B7

        style Note1 fill:#fff2cc,stroke:#d6b656,stroke-width:2px,color:#333

        B8(Post Note to /exampleapp/new_note_spa with JavaScript)
    end

    subgraph Server
        S1(Return HTML, CSS, and JS files)
        S2(Return JSON data)
        S3(Store submitted information)
    end

    B1 --> S1
    S1 --> B2
    B2 --> B3
    B3 --> S2
    S2 --> B4
    B4 --> U1
    U2 --> B5
    B5 --> B6
    B6 --> B7
    B7 --> B8
    B8 --> S3
```