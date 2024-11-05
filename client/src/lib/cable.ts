import { createConsumer } from "@rails/actioncable";

const cable = createConsumer("ws://localhost:3002/cable");

export default cable;
