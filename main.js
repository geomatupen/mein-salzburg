// Wire UI controls after DOM is ready. Wrap in DOMContentLoaded so this file can be
// safely included anywhere without timing issues.
document.addEventListener('DOMContentLoaded', () => {
  // Helper to safely add listener if element exists
  function onEl(id, ev, fn) {
    const el = document.getElementById(id);
    if (!el) return; // element missing -> silently skip
    el.addEventListener(ev, fn);
  }

  // Toggle visibility of regions layer
  onEl('regions-visible', 'change', (e) => {
    const v = e.target.checked ? 'visible' : 'none';
    if (typeof map !== 'undefined') {
      map.setLayoutProperty('regions', 'visibility', v);
      map.setLayoutProperty('regions-outline', 'visibility', v);
    }
  });

  // Toggle visibility of regions labels
  onEl('regions-labels-visible', 'change', (e) => {
    const v = e.target.checked ? 'visible' : 'none';
    if (typeof map !== 'undefined') map.setLayoutProperty('regions-labels', 'visibility', v);
  });

  // Adjust opacity of regions layer and labels
  onEl('regions-opacity', 'input', (e) => {
    const op = parseFloat(e.target.value);
    if (typeof map !== 'undefined') {
      map.setPaintProperty('regions-fill', 'fill-opacity', op);
      map.setPaintProperty('regions-outline', 'line-opacity', op);
      map.setPaintProperty('regions-labels', 'text-opacity', op);
    }
  });

  // Toggle visibility of different marker types
  onEl('marker-default-visible', 'change', (e) => {
    if (typeof markerDefault === 'undefined') return;
    if (e.target.checked) markerDefault.addTo(map);
    else markerDefault.remove();
  });

  onEl('marker-png-visible', 'change', (e) => {
    if (typeof markerPNG === 'undefined') return;
    if (e.target.checked) markerPNG.addTo(map);
    else markerPNG.remove();
  });

  onEl('marker-html-visible', 'change', (e) => {
    if (typeof markerHTML === 'undefined') return;
    if (e.target.checked) markerHTML.addTo(map);
    else markerHTML.remove();
  });
});

