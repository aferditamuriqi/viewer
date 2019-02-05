
M.AutoInit();

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.collapsible');
  M.Collapsible.init(elements, {accordion: true});
});

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elements, {
    alignment: 'right',
    constrainWidth: false,
    coverTrigger: false,
    closeOnClick: false
  });
});

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elements, {'edge': 'left'});
});

document.addEventListener('DOMContentLoaded', function() {
  let elements = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elements, {'edge': 'left'});
});

document.addEventListener('DOMContentLoaded', function() {
    let elements = document.querySelectorAll('.tabs');  
    M.Tabs.init(elements);
});