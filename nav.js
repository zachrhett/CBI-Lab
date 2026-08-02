(function () {
  const links = [
    ['index.html', 'Home'],
    ['contents.html', 'Contents'],
    ['scoring.html', 'Scoring'],
    ['frameworks.html', 'Frameworks'],
    ['glossary.html', 'Glossary'],
    ['references.html', 'References'],
    ['questionnaire.html', 'Questionnaire'],
    ['daylog.html', 'Day log'],
    ['calculator.html', 'Calculator'],
    ['mathematics.html', 'Mathematics'],
    ['cbt.html', 'CBT'],
    ['paradigms.html', 'Paradigms'],
    ['disorders.html', 'Disorders'],
    ['identifiers.html', 'Identifiers'],
    ['personalities.html', 'MBPA'],
    ['bigfive.html', 'Big Five'],
    ['correlates.html', 'Correlates'],
    ['scenarios.html', 'Scenarios'],
    ['overview.html', 'Overview']
  ];
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('#nav-links').forEach(nav => {
    nav.innerHTML = links.map(([href, label]) => {
      const active = href === page ? ' class="active"' : '';
      return '<a href="' + href + '"' + active + '>' + label + '</a>';
    }).join('');
  });
  document.getElementById('nav-toggle')?.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.toggle('open');
  });
})();
