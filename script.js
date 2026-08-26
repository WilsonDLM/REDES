document.addEventListener('DOMContentLoaded', () => {
  // 1. Mostrar/Ocultar detalles generales
  const toggleBtn = document.getElementById('toggle-btn');
  const detailsSection = document.querySelector('.details');

  toggleBtn.addEventListener('click', () => {
    const isHidden = detailsSection.classList.toggle('hidden');
    toggleBtn.textContent = isHidden ? 'Mostrar detalles' : 'Ocultar detalles';
  });

  // 2. Base de datos estructurada por protocolo (puntos clave hacia abajo)
  const protocolsData = {
    ipv4: {
      title: 'IPv4 (Internet Protocol Version 4)',
      items: [
        '<strong>Función Principal:</strong> Asigna una dirección numérica única (como 192.168.1.1) a cada equipo, teléfono o servidor en una red local o en internet..',
        '<strong>Característica Clave:</strong> Formato decimal punteado (ej. 192.168.1.1). Permite aprox. 4.3 mil millones de direcciones.',
        '<strong>Uso en Exposición:</strong> Se requiere NAT por el agotamiento global de sus direcciones.'
      ]
    },
    ipv6: {
      title: 'IPv6 (Internet Protocol Version 6)',
      items: [
        '<strong>Función Principal:</strong> Evolución directa de IPv4 con direcciones de 128 bits.',
        '<strong>Característica Clave:</strong> Formato hexadecimal separado por dos puntos. Espacio de direcciones casi ilimitado.',
        '<strong>Uso en Exposición:</strong> Elimina la necesidad de NAT y mejora la seguridad nativa (IPsec).'
      ]
    },
    icmp: {
      title: 'ICMP (Internet Control Message Protocol)',
      items: [
        '<strong>Función Principal:</strong> Reporte de errores y diagnóstico de red.',
        '<strong>Característica Clave:</strong> No transporta datos de usuario; solo mensajes de control entre routers y hosts.',
        '<strong>Uso en Exposición:</strong> Es el protocolo base detrás de herramientas esenciales como <code>ping</code> y <code>traceroute</code>.'
      ]
    },
    ospf: {
      title: 'OSPF (Open Shortest Path First)',
      items: [
        '<strong>Función Principal:</strong> Protocolo de enrutamiento dinámico dentro de una misma red empresarial (IGP).',
        '<strong>Característica Clave:</strong> Basado en el estado de enlace y calcula la ruta más corta mediante el algoritmo Dijkstra.',
        '<strong>Uso en Exposición:</strong> Destacar su rápida convergencia y alta escalabilidad en redes grandes.'
      ]
    },
    bgp: {
      title: 'BGP (Border Gateway Protocol)',
      items: [
        '<strong>Función Principal:</strong> Protocolo de enrutamiento entre Sistemas Autónomos en Internet (EGP).',
        '<strong>Característica Clave:</strong> Basado en vectores de rutas y políticas comerciales de tráfico.',
        '<strong>Uso en Exposición:</strong> Explicar que es literalmente la "columna vertebral" que interconecta a los ISPs del mundo.'
      ]
    },
    arp: {
      title: 'ARP (Address Resolution Protocol)',
      items: [
        '<strong>Función Principal:</strong> Mapeo entre la Capa 3 y la Capa 2 del modelo OSI.',
        '<strong>Característica Clave:</strong> Convierte una dirección IP conocida en su correspondiente dirección física MAC.',
        '<strong>Uso en Exposición:</strong> Vital para el envío de paquetes en el tramo final dentro de una red local (LAN).'
      ]
    },
    rip: {
      title: 'RIP (Routing Information Protocol)',
      items: [
        '<strong>Función Principal:</strong> Protocolo de enrutamiento dinámico básico por vector de distancia.',
        '<strong>Característica Clave:</strong> Utiliza el número de saltos (máximo 15 routers) para elegir la ruta.',
        '<strong>Uso en Exposición:</strong> Mencionar que es de los más antiguos y simples, utilizado hoy mayormente con fines educativos.'
      ]
    }
  };

  // 3. Lógica del panel desplegable
  const buttons = document.querySelectorAll('.badge-btn');
  const infoDisplay = document.getElementById('protocol-info');
  const protoTitle = document.getElementById('proto-title');
  const protoList = document.getElementById('proto-list');
  const closeBtn = document.getElementById('close-info-btn');

  let activeButton = null;

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const protoKey = button.getAttribute('data-proto');

      // Si hace clic en el mismo botón activo, se oculta
      if (activeButton === button) {
        cerrarInfo();
        return;
      }

      // Desactivar botón previo
      if (activeButton) {
        activeButton.classList.remove('active');
      }

      // Activar nuevo botón
      button.classList.add('active');
      activeButton = button;

      // Cargar datos en lista vertical
      const data = protocolsData[protoKey];
      if (data) {
        protoTitle.textContent = data.title;
        protoList.innerHTML = data.items.map(item => `<li>• ${item}</li>`).join('');
        infoDisplay.classList.remove('hidden');
      }
    });
  });

  function cerrarInfo() {
    if (activeButton) {
      activeButton.classList.remove('active');
      activeButton = null;
    }
    infoDisplay.classList.add('hidden');
  }

  closeBtn.addEventListener('click', cerrarInfo);
});