(function () {
  // Canonical flow: tools → model → libraries → integrity appendices
  const links = [
    ['index.html', 'Home'],
    ['overview.html', 'Overview'],
    ['scoring.html', 'Scoring'],
    ['questionnaire.html', 'Questionnaire'],
    ['daylog.html', 'Day log'],
    ['calculator.html', 'Calculator'],
    ['mathematics.html', 'Mathematics'],
    ['frameworks.html', 'Frameworks'],
    ['correlates.html', 'Correlates'],
    ['identifiers.html', 'Identifiers'],
    ['personalities.html', 'MBPA'],
    ['bigfive.html', 'Big Five'],
    ['disorders.html', 'Disorders'],
    ['cbt.html', 'CBT'],
    ['paradigms.html', 'Paradigms'],
    ['scenarios.html', 'Scenarios'],
    ['glossary.html', 'Glossary'],
    ['references.html', 'References'],
    ['contents.html', 'Contents']
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
