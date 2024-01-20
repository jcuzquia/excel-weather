export async function getHeatMapTable(): Promise<any> {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("values");
      await context.sync();

      console.log(`The column count is ${JSON.stringify(range.values, null, 4)}.`);
    });
  } catch (error) {
    console.error(error);
  }
}
