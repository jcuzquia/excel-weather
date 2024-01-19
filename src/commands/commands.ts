/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global Office */
/* global Excel  */

Office.onReady(() => {
  // If needed, Office.js is ready to be called
});

export const changeCellColor = async () => {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * Shows a notification when the add-in command is executed.
 * @param event
 */
function action(event: Office.AddinCommands.Event) {
  const message: Office.NotificationMessageDetails = {
    type: Office.MailboxEnums.ItemNotificationMessageType.InformationalMessage,
    message: "Performed action.",
    icon: "Icon.80x80",
    persistent: true,
  };

  // Show a notification message
  Office.context.mailbox.item.notificationMessages.replaceAsync("action", message);

  // Be sure to indicate when the add-in command function is complete
  event.completed();
}

function getGlobal() {
  return typeof self !== "undefined"
    ? self
    : typeof window !== "undefined"
    ? window
    : typeof global !== "undefined"
    ? global
    : undefined;
}

const g = getGlobal() as any;

// The add-in command functions need to be available in global scope
g.action = action;

export function writeWeatherDataToOfficeDocument(csvData: string, worksheetName: string): Promise<any> {
  return Excel.run(async function (context) {
    const wb = context.workbook;
    const ws = wb.worksheets.add(worksheetName);

    const rows = csvData.split("\n");
    for (let i = 0; i < rows.length; i++) {
      const columns = rows[i].split(",");

      // Populate each cell in the row
      for (let j = 0; j < columns.length; j++) {
        ws.getCell(i, j).values = [[columns[j]]];
      }
    }
    ws.activate();
    let rng = ws.getRange("A1");
    rng.select();

    return await context.sync();
  });
}
