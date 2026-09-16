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
        '<strong>Característica Clave:</strong> Formato decimal punteado (ej. 192.168.1.1). Permite aprox. 4.3 mil millones de direcciones, Se requiere NAT por el agotamiento global de sus direcciones.'
      ]
    },
    ipv6: {
      title: 'IPv6 (Internet Protocol Version 6)',
      items: [
        '<strong>Función Principal:</strong> Evolución directa de IPv4 con direcciones de 128 bits, Formato hexadecimal separado por dos puntos (ej. 2001:0db8:85a3:0000:0000:8a2e:0370:7334).',
        '<strong> Caracteristicas Claves:</strong> Elimina la necesidad de NAT y mejora la seguridad nativa (IPsec), Soporta un número prácticamente ilimitado de direcciones, diseñado para la expansión futura de internet.'
      ]
    },
    icmp: {
      title: 'ICMP (Internet Control Message Protocol)',
      items: [
        '<strong>Función Principal:</strong> Reporte de errores y diagnóstico de red.',
        '<strong>Característica Clave:</strong> No transporta datos de usuario; solo mensajes de control entre routers y hosts, Es el protocolo base detrás de herramientas esenciales como <code>ping</code> y <code>traceroute</code>.'
      ]
    },
    igp:{
      title: 'IGP (Interior Gateway Protocol)',
      items: [
        '<strong>Función Principal:</strong> Protocolo de enrutamiento dentro de un Sistema Autónomo (AS).',
        '<strong>Característica Clave:</strong> Optimiza la ruta de los paquetes dentro de una red interna, Ejemplos incluyen Open Shortest Path First (OSPF), Routing Information Protocol (RIP) y Enhanced Interior Gateway Protocol (EIGRP).'
      ]
    },
    bgp: {
      title: 'BGP (Border Gateway Protocol)',
      items: [
        '<strong>Función Principal:</strong> Protocolo de enrutamiento entre Sistemas Autónomos en Internet (EGP).',
        '<strong>Característica Clave:</strong> Basado en vectores de rutas y políticas comerciales de tráfico, es el pilar que interconecta a los ISPs del mundo.'
      ]
    },
    arp: {
      title: 'ARP (Address Resolution Protocol)',
      items: [
        '<strong>Función Principal:</strong> Mapeo entre la Capa 3 y la Capa 2 del modelo OSI.',
        '<strong>Característica Clave:</strong> Convierte una dirección IP conocida en su correspondiente dirección física MAC, Vital para el envío de paquetes en el tramo final dentro de una red local (LAN).'
      ]
    },
    dhcp: {
      title: 'DHCP (Dynamic Host Configuration Protocol)',
      items: [
        '<strong>Función Principal:</strong> Asignación automática de direcciones IP y configuración de parámetros de red a los dispositivos en una red local.',
        '<strong>Característica Clave:</strong> Permite la gestión centralizada de la configuración de red, eliminando la necesidad de configurar manualmente cada dispositivo.'
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