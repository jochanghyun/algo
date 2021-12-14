export const solution = (word: string, pages: string[]) => {
  word = word.toUpperCase();
  const scoreMap = new Map<
    string,
    { childLink: string[]; selfScore: number; outerLength: number }
  >();
  for (const page of pages) {
    const metaTags = page.match(/\<meta property="og:url".*\>/g);
    if(!metaTags || metaTags.length===0) continue

    const [url] = metaTags[0].match(/\ content.*\"/g);
    const selfUrl = url.split("=")[1];
    if (!scoreMap.has(selfUrl)) {
      scoreMap.set(selfUrl, {
        childLink: [],
        selfScore: 0,
        outerLength: 0,
      });
    }
  }
  for (const page of pages) {
    const aTags = page.match(/\<a.*\<\/a>/g);
    const [metaTag] = page.match(/\<meta property="og:url".*\>/g);
    const [url] = metaTag.match(/\ content.*\"/g);

    const selfUrl = url.split("=")[1];
    if (!scoreMap.has(selfUrl)) {
      scoreMap.set(selfUrl, {
        childLink: [],
        selfScore: 0,
        outerLength: aTags.length,
      });
    }

    const childList: string[] = scoreMap.has(selfUrl)
      ? scoreMap.get(selfUrl).childLink
      : [];
    for (const aTag of aTags) {
      const [href] = aTag.match(/\href=.*\"/);
      const [parentUrl] = href.match(/\".*\"/);
      const parentCurrentValue = scoreMap.get(parentUrl);
      if (parentCurrentValue) {
        scoreMap.set(parentUrl, {
          ...parentCurrentValue,
          childLink: [...parentCurrentValue.childLink, selfUrl],
        });
      }
    }
    const selfScore = page.split(/[^A-Za-z]/g).reduce((score,item)=>item.toUpperCase()===word?score+1:score,0);
    scoreMap.set(selfUrl, {
      childLink: childList,
      selfScore: selfScore,
      outerLength: aTags.length,
    });
  }
  const result = Array.from(scoreMap).reduce(
    (state, [key, value], index) => {
      const current = value.childLink.reduce((score, link) => {
        const v = scoreMap.get(link);
        return score + v.selfScore / v.outerLength;
      }, 0);
      return current + value.selfScore > state.max
        ? { max: current + value.selfScore, index }
        : state;
    },
    { max: 0, index: 0 }
  );
  return result.index;
};

// solution("blind", [
//   'href="a"<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://a.com"/>\n</head>  \n<body>\nBlind Lorem Blind ipsum dolor Blind test sit amet, consectetur adipiscing elit. \n<a href="https://b.com"> Link to b </a>\n</body>\n</html>',
//   '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://b.com"/>\n</head>  \n<body>\nSuspendisse potenti. Vivamus venenatis tellus non turpis bibendum, \n<a href="https://a.com"> Link to a </a>\nblind sed congue urna varius. Suspendisse feugiat nisl ligula, quis malesuada felis hendrerit ut.\n<a href="https://c.com"> Link to c </a>\n</body>\n</html>',
//   '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://c.com"/>\n</head>  \n<body>\nUt condimentum urna at felis sodales rutrum. Sed dapibus cursus diam, non interdum nulla tempor nec. Phasellus rutrum enim at orci consectetu blind\n<a href="https://a.com"> Link to a </a>\n</body>\n</html>',
// ]);
solution("Muzi", [
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
]);

