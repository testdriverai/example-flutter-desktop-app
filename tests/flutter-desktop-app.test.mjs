/**
 * Installs LocalSend (an open-source Flutter desktop app) on Linux, renames the
 * device in Settings, and checks the new name on the Receive screen.
 */
import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

const LOCALSEND_DEB =
  "https://github.com/localsend/localsend/releases/download/v1.18.2/LocalSend-1.18.2-linux-x86-64.deb";

describe("LocalSend (Flutter)", () => {
  it("renames the device and shows the new name on the Receive screen", async (context) => {
    const testdriver = TestDriver(context);

    // Download and install the .deb. We start the app ourselves below.
    await testdriver.provision.installer({ url: LOCALSEND_DEB, launch: false });

    // Pull in missing runtime dependencies (including the tray icon library), then start LocalSend.
    await testdriver.exec(
      "sh",
      "sudo apt-get update -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -f -y -qq && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y -qq libayatana-appindicator3-1",
      240000,
    );
    await testdriver.exec("sh", "nohup localsend_app >/tmp/localsend.log 2>&1 &", 10000);

    // Wait for the window. LocalSend opens on the Receive screen with a random device name.
    await testdriver.find("the LocalSend window showing the Receive screen with a device name", {
      timeout: 60000,
    });

    // Open Settings and scroll to the bottom of the list.
    await testdriver.find("Settings tab in the LocalSend navigation").click();
    await testdriver.find("the Animations row in the General settings section").hover();
    await testdriver.scroll("down", { amount: 2000 });

    // The device name lives in the Network section, which Advanced settings reveals.
    await testdriver.find("the Advanced settings checkbox near the bottom of the Settings page").click();
    await testdriver.find("the Device name text field in the Network section").click();

    // Replace the name in the dialog and confirm.
    await testdriver.find("the text input inside the Device name dialog").click();
    await testdriver.pressKeys(["ctrl", "a"]);
    await testdriver.type("TestDriver Laptop");
    await testdriver.find("the green Confirm button in the Device name dialog").click();

    // LocalSend asks for a server restart before the new name is used.
    await testdriver.find("the circular restart arrow button in the Server row of the Network section").click();

    // Go back to Receive, wait for the new name, then check it.
    await testdriver.find("Receive tab in the LocalSend navigation").click();
    await testdriver.find('the device name "TestDriver Laptop" shown under the logo on the Receive screen', {
      timeout: 15000,
    });
    const renamed = await testdriver.assert(
      'the LocalSend Receive screen shows the device name "TestDriver Laptop" under the logo',
    );
    expect(renamed).toBeTruthy();
  });
});
