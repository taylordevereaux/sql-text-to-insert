/// Default Options used when parsing the input.
const optionsDefault = {
  trimEntries: true,
  tabsAsColumns: true
}

/*************************************************************
 * Helper Functions
 *************************************************************/
// Parses the collection of rows from the input text.
export function parseRows(input = '') {
  // If ther is no input we don't need to do anything.
  if (input !== "") {
    // We need to get each new line entry and filter out any blanks.
    let split = input.split('\n');
    let filter = split.filter(x => x.trim() != "");
    return filter;
  }
  return [];
}
// Returns the maximum amount of columns found in each row.
function parseColumnCountFromRows(rows = []) {
  // If the filtered version has more than one item we can display the output to the user.
  if (rows.length > 0) {
    // If the treat tabs as column flag is set we need to get the maximum column count.
    var max = rows.map(function (item) {
      return item.split('\t').filter(function (tabItem) { return tabItem.trim() !== "" }).length;
    });
    return Math.max(...max);
  }
  return 1; // Always at least one column.
}
/*************************************************************
 * Export Functions
 *************************************************************/
// Returns the maximum amount of columns found in each row parsed from the input text.
export function parseColumnCount(input = '') {
  let filter = parseRows(input);
  // If the filtered version has more than one item we can display the output to the user.
  if (filter.length > 0) {
    // If the treat tabs as column flag is set we need to get the maximum column count.
    var max = filter.map(function (item) {
      return item.split('\t').filter(function (tabItem) { return tabItem.trim() !== "" }).length;
    });
    return Math.max(...max);
  }
  return 1; // Always at least one column.
}

// Updates the output based on the input and any options.
export function parseSQLInsertInto(input = '', tableName = '', columns = [], options = {}) {
  // Get the default options if they were not passed.
  options = Object.assign(optionsDefault, options);
  // Should we trim the entries for spaces.
  // Should we create a column based on the tabs.
  const { trimEntries, tabsAsColumns } = options;
  // The output content that will be displayed to the user.
  var output = [];
  // We start to build the output based on the options provided.
  if (tableName !== "") {
    output.push(`INSERT INTO ${tableName} \nVALUES`);
  }
  // We need to get each new line entry and filter out any blanks.
  const filter = parseRows(input);
  // If the filtered version has more than one item we can display the output to the user.
  if (filter.length > 0) {
    // If the treat tabs as column flag is set we need to get the maximum column count.
    var columnCount = tabsAsColumns ? parseColumnCountFromRows(filter) : 1;
    // We now loop through each row entry and append it to the output.
    for (var i = 0; i < filter.length; ++i) {
      var entry = filter[i];
      // If the trim flag is set we need to trim the entry.
      entry = trimEntries ? entry.trim() : entry;
      var item = ["("];
      // We need to loop for each column if the tabColumns flag is set.
      if (tabsAsColumns) {
        var splitEntry = entry.split('\t');
        // loop for the max column count.
        for (let c = 0; c < columnCount; ++c) {
          // We need to use the configured quotes settings.
          let quote = columns[c].includeQuotes ? "'" : "";
          // If we are not including quotes and the text is empty it needs to be null instead.
          let empty = columns[c].includeQuotes ? "" : "NULL";
          // Get the endQuote
          let end = c != (columnCount - 1) ? `${quote}, ` : `${quote}`;
          let content = (c < splitEntry.length)
            // If the trim flag is set we trim each column as well.
            ? (trimEntries ? splitEntry[c].trim() : splitEntry[c])
            // We need to add an empty entry.
            : empty;
          item.push(`${quote}${content}${end}`);
        }
      } else {
        item.push(`'${entry}'`);
      }
      // We only want to add a comma if we aren't the last entry.
      item.push(i != (filter.length - 1) ? ")," : ")");
      // Join the items array into a string.
      output.push(item.join(''));
    }
    //console.log(output);
  }
  // We now set the output pre control to the content we generated.
  return output.join('\n');
}

// // TEST DATA Generate some temporary data.
// var tempInput =
//     `ID1	Data1	543.21
//   ID2	Data2	98.65
//   ID4	Data4	9083`;
// var tempTable = '@Values';
// // The content form the input control.
// var inputCtrl = document.getElementById('input');
// // The SQL Table name if it was provided.
// var tableNameCtrl = document.getElementById('tableName');
// // Set the temporary values.
// inputCtrl.value = tempInput;
// tableNameCtrl.value = tempTable;
// // END TEST DATA

// // At the very start we are going to create our initial column
// updateOutput();

// // TEST DATA - Reset the values back to normal.
// inputCtrl.value = '';
// tableNameCtrl.value = '';
// // END TEST DATA

// // Binds the key up event to the input text area.
// $('#input').on('keyup', updateOutput).on('keydown', enableTab);
// // Binds the key up event to the table name input 
// document.getElementById('tableName')
//     .addEventListener('keyup', updateOutput);
// // Binds the checked change event to the checkbox inputs 
// document.getElementById('tabColumns')
//     .addEventListener('change', updateOutput);
// document.getElementById('trimEntries')
//     .addEventListener('change', updateOutput);
// // When the copy button is clicked we want to copy the text to clipboard or to highlight the pre content.
// document.getElementById('copyBtn')
//     .addEventListener('click', function (event) {

//         var text = document.getElementById('output');
//         var range;
//         var selection;

//         if (document.body.createTextRange) {
//             range = document.body.createTextRange();
//             range.moveToElementText(text);
//             range.select();
//         } else if (window.getSelection) {
//             selection = window.getSelection();
//             range = document.createRange();
//             range.selectNodeContents(text);
//             selection.removeAllRanges();
//             selection.addRange(range);
//         }
//     });