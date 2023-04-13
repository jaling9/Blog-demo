import { h } from "preact";
import { useState } from "preact/hooks";

export default function Greeting({ messages }) {
    const randomMessage = () =>
        messages[Math.floor(Math.random() * messages.length)];

    const [greeting, setGreeting] = useState(messages[0]);

    return (
        <div>
            <h3>{greeting}! 非常欢迎你的到来!</h3>
            <button onClick={() => setGreeting(randomMessage())}>打招呼</button>
        </div>
    );
}
