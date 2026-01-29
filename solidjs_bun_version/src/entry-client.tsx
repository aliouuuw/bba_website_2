// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";

const client = () => <StartClient />;

mount(client, document.getElementById("app")!);

export default client;
