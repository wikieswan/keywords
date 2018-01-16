// export default fSplitKeywordsFromStringText;

function fSplitKeywordsFromStringText(str, aKeyword) {
  const aPos = getAllKeywordsPosInStr(str, aKeyword);
  const aRst = filterKeywordsPosInStr(aPos);
  const aFragment = getFinalTextMap(str, aRst);
  return aFragment;
}


/**
 * get a keyword's positions in a string
 * expect: 
 * in:
    var str = 'xxABCxxBCDxxABCDExx'
    var sKeyword = 'ABC'
   out:
   [{keyword: "ABC", len: 3, pos: 2},
   {keyword: "ABC", len: 3, pos: 12}]
 __proto__
 :
 Array(0)

 * @param str
 * @param label
 * @returns {Array}
 */
function getKeywordPosInStr(str, label) {
  const aIndexs = [];
  let pos = str.indexOf(label);
  aIndexs.push({
    keyword: label,
    len: label.length,
    pos,
  });
  while (pos !== -1) {
    pos = str.indexOf(label, pos + 1);
    const seed = {
      keyword: label,
      len: label.length,
      pos,
    };
    if (pos !== -1) {
      aIndexs.push(seed);
    }
  }
  return aIndexs;
}


/**
 * get all keywords's positions in a string. keywords are in an array ,aKeywords.
 expect:
 in
 var str = 'xxABCxxBCDxxABCDExx'
 var aKeyword = ['ABC','BCD','CDE'];
 out:
 [{keyword: "ABC", len: 3, pos: 2},
 {keyword: "BCD", len: 3, pos: 7},
 {keyword: "ABC", len: 3, pos: 12},
 {keyword: "BCD", len: 3, pos: 13},
 {keyword: "CDE", len: 3, pos: 14}]

 * @param str
 * @param aKeywords
 * @returns {Array}
 */
function getAllKeywordsPosInStr(str, aKeywords) {
  const aIndex = [];
  aKeywords.forEach((val) => {
    const s = getKeywordPosInStr(str, val);
    aIndex.push(...s);
  });
  aIndex.sort((a, b) => (a.pos - b.pos));
  return aIndex;
}

/**
 * filter keywords positions which are repeated
 * expect:
 in:
 [{keyword: "ABC", len: 3, pos: 2},
 {keyword: "BCD", len: 3, pos: 7},
 {keyword: "ABC", len: 3, pos: 12},
 {keyword: "BCD", len: 3, pos: 13},
 {keyword: "CDE", len: 3, pos: 14}]
 out:
 [{keyword: "ABC", len: 3, pos: 2},
 {keyword: "BCD", len: 3, pos: 7},
 {keyword: "ABCDE", len: 5, pos: 12}]
 * @param aPos
 * @returns {Array}
 */
function filterKeywordsPosInStr(aPos) {
  const arr = [];
  aPos.forEach((item, i) => {
    if (i === 0) {
      arr.push(item);
    } else {
      const preItem = arr.pop();
      if (item.pos - preItem.pos > preItem.len) {
        arr.push(preItem);
        arr.push(item);
      } else {
        const mixnLen = item.pos - preItem.pos;
        const newKeyword = preItem.keyword.substr(0, mixnLen) + item.keyword.substr(0);
        arr.push({
          keyword: newKeyword,
          len: newKeyword.length,
          pos: preItem.pos,
        });
      }
    }
  });
  return arr;
}


/**
 * get text list map ,
 in:
 var str = 'xxABCxxBCDxxABCDExx'
 [{keyword: "ABC", len: 3, pos: 2},
 {keyword: "BCD", len: 3, pos: 7},
 {keyword: "ABCDE", len: 5, pos: 12}]
 out:
 [{type: 0, text: "xx"},
 {type: 1, text: "ABC"},
 {type: 0, text: "xx"},
 {type: 1, text: "BCD"},
 {type: 0, text: "xx"},
 {type: 1, text: "ABCDE"}]
 * @param str
 * @param aPos
 * @returns {Array}
 */
function getFinalTextMap(str, aPos) {
  const arr = [];
  let index = 0;
  aPos.forEach((item, i) => {
    const sFragment = str.substring(index, item.pos);
    const oFragment = {
      type: 0,
      text: sFragment,
    };
    const oKeyword = {
      type: 1,
      text: item.keyword,
    };
    arr.push(oFragment);
    arr.push(oKeyword);
    index = item.pos + item.len;
  });
  return arr;
}
