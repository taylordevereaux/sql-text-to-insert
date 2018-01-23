import './style.css';
// This will allow the user to use the tab key in the input area.
function enableTab (e) {
  if (e.keyCode === 9) { // tab was pressed
    // get caret position/selection
    var val = this.value,
        start = this.selectionStart,
        end = this.selectionEnd;
    // set textarea value to: text before caret + tab + text after caret
    this.value = val.substring(0, start) + '\t' + val.substring(end);
    // put caret at right position again
    this.selectionStart = this.selectionEnd = start + 1;
    // prevent the focus lose
    return false;

  }
}
// Creates column options for the amount of columns passed to the function
function createColummOptions(columnCount = 1) {
  var tableBody = $('#columnOptionsTable').children('tbody');
  var rows = tableBody.children('tr');
  // If we have to many columns we need to remove extras
  if (rows.length > columnCount) {
    //Filter out the extra rows.
    rows = rows.filter(x => x < columnCount);
    // Always refresh the rows
    tableBody.empty().append(rows);
  } else if (rows.length < columnCount) {
    // IF we have less than the column count then we need to create the new columns.
    let l = rows.length+1;
    // Loop for the new amount we need to create.
    for (l=l; l <= columnCount; ++l) {
      // The input checkbox that allows the user to confure the output per column.
      let input = $("<input type='checkbox' checked class='columnQuotes' />")
        // We need to bind to the change event of each option to update the output
        .on('change', updateOutput)
        .attr('name', `columnQuotes${l}`)
        .attr('id', `columnQuotes${l}`);
      // Crete the row and append the two columns.
      let row = $('<tr></tr>');
      row.append($('<td></td>').html(l));
      row.append($('<td></td>').append(input));
      // Append the new row to the table body.
      tableBody.append(row);
    }
  }
}
// The will read the columns options and return a map for each column index.
function getColumnOptions () {
  let options = {
    quotes: {}
  };
  // We need to loop through each row and get the options.
  var rows = $('#columnOptionsTable')
    .children('tbody')
    .children('tr')
    .each((index,x) => {
        let i = parseInt($('td', x).first().html())-1;
        options["quotes"][i] = $('input.columnQuotes', x).is(':checked'); 
      });
  return options;
}

// Updates the output based on the input and any options.
function updateOutput(event) {
  // The content form the input control.
  var input = document.getElementById('input').value.trim();
  // The SQL Table name if it was provided.
  var tableName = document.getElementById('tableName').value.trim();
  // Should we trim the entries for spaces.
  var trim = document.getElementById('trimEntries').checked;
  // Should we create a column based on the tabs.
  var tabColumns = document.getElementById('tabColumns').checked;
  // The PRE ctrl that we will display the output content to.
  var outputCtrl = document.getElementById('output');
 
  // The output content that will be displayed to the user.
  var output = [];
  // We start to build the output based on the options provided.
  if (tableName !== "") {
    output.push("INSERT INTO " + tableName);
    output.push("VALUES");
  }
  // If ther is no input we don't need to do anything.
  if (input !== "") {
    // We need to get each new line entry and filter out any blanks.
    var split = input.split('\n');
    var filter = split.filter(function (item) {
      return item.trim() != "";
    });
    // If the filtered version has more than one item we can display the output to the user.
    if (filter.length > 0) {
      // If the treat tabs as column flag is set we need to get the maximum column count.
      var columnCount = 1;
      if (tabColumns) {
        var max = filter.map(function (item) {
          return item.split('\t').filter(function(tabItem) {return tabItem.trim() !== ""}).length;
        });
        columnCount = Math.max(...max);
      }
      // Once we have the column Count we can update the columns
      createColummOptions(columnCount);
      // Retrieve the column options.
      var options = getColumnOptions();
      console.log(options);
      // We now loop through each row entry and append it to the output.
      for (var i = 0; i < filter.length; ++i) {
        var entry = filter[i];
        // If the trim flag is set we need to trim the entry.
        if (trim) entry = entry.trim();
        
        var item = ["("];
        // We need to loop for each column if the tabColumns flag is set.
        if (tabColumns) {
          var splitEntry = entry.split('\t');
          // loop for the max column count.
          for (let c = 0; c < columnCount; ++c) {
            // We need to use the configured quotes settings.
            let quote = options["quotes"][c] ? "'" : "";
            // Get the endQuote
            let end = c != (columnCount-1) ? `${quote}, ` : `${quote}`;
            let content =  (c < splitEntry.length) 
              // If the trim flag is set we trim each column as well.
              ? (trim ? splitEntry[c].trim() : splitEntry[c])
               // We need to add an empty entry.
              : "";
            item.push(`${quote}${content}${end}`);
          }
        } else {
          item.push(`'${entry}'`);
        }
        // We only want to add a comma if we aren't the last entry.
        item.push(i != (filter.length-1) ? ")," : ")");
        // Join the items array into a string.
        output.push(item.join(''));
      }
      //console.log(output);
    } 
  }
  // We now set the output pre control to the content we generated.
  outputCtrl.innerHTML = output.join('\n');
}

// At the very start we are going to create our initial column
updateOutput();

// Binds the key up event to the input text area.
$('#input').on('keyup', updateOutput).on('keydown', enableTab);
// Binds the key up event to the table name input 
document.getElementById('tableName')
  .addEventListener('keyup', updateOutput);
// Binds the checked change event to the checkbox inputs 
document.getElementById('tabColumns')
  .addEventListener('change', updateOutput);
document.getElementById('trimEntries')
  .addEventListener('change', updateOutput);
// When the copy button is clicked we want to copy the text to clipboard or to highlight the pre content.
document.getElementById('copyBtn')
  .addEventListener('click', function (event) {
  
  var text = document.getElementById('output');
  var range;
  var selection;
  
  if (document.body.createTextRange) {
    range = document.body.createTextRange();
    range.moveToElementText(text);
    range.select();
  } else if (window.getSelection) {
    selection = window.getSelection();
    range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  }
});