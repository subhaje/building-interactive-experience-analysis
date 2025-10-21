function initializeInteractiveMarkers() {
  const markers = document.querySelectorAll('.interactive-marker');
  
  markers.forEach(marker => {
    marker.addEventListener('click', handleMarkerClick);
    marker.setAttribute('role', 'button');
    marker.setAttribute('tabindex', '0');
    marker.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        handleMarkerClick(e);
      }
    });
  });
  
  console.log(`Initialized ${markers.length} markers`);
}

function handleMarkerClick(event) {
  const marker = event.currentTarget;
  const sectionId = marker.id.replace('marker-', '');
  const rect = marker.getBoundingClientRect();
  
  showPopover(sectionId, rect.left + rect.width / 2, rect.top);
}

const sections = {
  'classrooms': { title: 'Classrooms', desc: 'Learning spaces' },
  'science-lab': { title: 'Science Lab', desc: 'Laboratory facilities' },
  'locker-room': { title: 'Locker Room', desc: 'Athletic facilities' },
  'gym': { title: 'Gymnasium', desc: 'Sports activities' },
  'lobby': { title: 'Lobby', desc: 'Main entrance' },
  'admin-offices': { title: 'Admin', desc: 'Administrative offices' },
  'cafeteria': { title: 'Cafeteria', desc: 'Dining area' },
  'kitchen': { title: 'Kitchen', desc: 'Food preparation' }
};

function showPopover(sectionId, x, y) {
  const data = sections[sectionId] || { title: sectionId, desc: 'Section area' };
  
  let popover = document.getElementById('section-popover');
  if (!popover) {
    popover = document.createElement('div');
    popover.id = 'section-popover';
    popover.style.cssText = `
      position: fixed;
      background: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      pointer-events: none;
    `;
    document.body.appendChild(popover);
  }
  
  popover.innerHTML = `
    <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">${data.title}</div>
    <div style="font-size: 12px; color: #666;">${data.desc}</div>
  `;
  
  popover.style.left = `${x}px`;
  popover.style.top = `${y - 60}px`;
  popover.style.transform = 'translateX(-50%)';
  popover.style.display = 'block';
  
  setTimeout(() => {
    if (popover) popover.style.display = 'none';
  }, 2000);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeInteractiveMarkers);
} else {
  initializeInteractiveMarkers();
}
