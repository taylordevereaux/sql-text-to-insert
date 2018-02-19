import { parseColumnCount, parseSQLInsertInto, parseRows } from './parser';

describe("parser", () => {

  const testInput1 = 
`testcol1\ttestcol2
testrow2   this has no tab
third row no tab
fourth row has a ->\ttab`;

  it("should have 4 rows", () => {
    expect(parseRows(testInput1).length).toBe(4);
  });

  it('should evaluate 2 columns', () => {
    expect(parseColumnCount(testInput1)).toBe(2);
  });
});
