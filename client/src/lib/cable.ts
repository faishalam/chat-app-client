import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("wss://chat-web-app-1358486b4ea0.herokuapp.com/cable");
// const cable = createConsumer("ws://localhost:3004/cable");

export default cable;
