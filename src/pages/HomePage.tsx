import { useState } from "react";

const ellipsis: any = {
  props: [],
  setProperty: function (prop: any, value: any) {
    this.props[prop] = value;
  },
  getProperty: function (prop: any) {
    return this.props[prop];
  },
};

export function HomePage() {
  const widget = {
    front: `<html>        
        <head>
          <meta charset="utf-8"/>
          <title>Marked in the browser</title>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <script>
          function renderCard() {
            document.getElementById('content').innerHTML = marked(ellipsis.getProperty("content"));
          }
          </script>
        </head>
        <body>
          <div id="content"></div>        
        </body>
        </html>`,
    back: `<html>
        <head>
        <script>
            function onCreate() {                
                ellipsis.setProperty("content", document.getElementById("myTextArea").value);
            }
        </script>
        </head>
        <body>
            <textarea id="myTextArea"></textarea>
        </body>        
        </html>`,
  };

  /*const widget = {
    front: `<html>
        <head>
        <script>
        function renderCard() {
            var content = ellipsis.getProperty("content");                
            document.getElementById("root").innerHTML = content;
        }
        </script>     
        </head> 
        <body>
        Hello world - this is a card made by PD
        <div id="root"/>
        </body>
    </html>`,
    back: `<html>
    <head>
    <script>
        function onCreate() {                
            ellipsis.setProperty("content", document.getElementById("myTextArea").value);
        }
    </script>
    </head>
    <body>
        <textarea id="myTextArea"></textarea>
    </body>        
    </html>`,
  };*/

  const [cards, setCards] = useState<any>([]);

  const onCreateButtonClicked = () => {
    (window.frames[0] as any).onCreate();
    setCards([
      ...cards,
      {
        name: "Example 1",
        src: widget.front,
      },
    ]);
  };

  return (
    <div className="HomePage">
      <h1>Ellipsis Prototype</h1>
      <div className="CreationBox">
        <div className="CreationBox-Content">
          <iframe
            title="widgetFrame"
            srcDoc={widget.back}
            onLoad={() => {
              (window.frames[0] as any).window.ellipsis = ellipsis;
            }}
          />
        </div>
        <button onClick={onCreateButtonClicked}>Create</button>
      </div>

      {cards.map((cards: any, idx: any) => (
        <div key={idx}>
          <iframe
            title={cards.name}
            srcDoc={cards.src}
            onLoad={() => {
              const cardFrame = window.frames[idx + 1] as any;
              cardFrame.window.ellipsis = ellipsis;
              cardFrame.renderCard();
            }}
          />
        </div>
      ))}
    </div>
  );
}
