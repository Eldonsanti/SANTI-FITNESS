// Sistema de Autenticación - SANTI FITNESS

// Variables globales
let currentUser = null;
let isGuest = false;

// Inicializar sesión al cargar la página
function initAuth() {
  // Crear usuarios por defecto si no existen
  initializeDefaultUsers();
  checkSession();
  renderSessionUI();
}

// Inicializar usuarios por defecto
function initializeDefaultUsers() {
  const users = JSON.parse(localStorage.getItem('users')) || {};
  
  // Solo agregar usuarios por defecto si no hay ninguno
  if (Object.keys(users).length === 0) {
    const defaultUsers = {
      'demo': {
        password: btoa('1234'),
        created: new Date().toISOString(),
        profile: {
          name: 'Demo User',
          age: 25,
          gender: 'M',
          height: 180,
          weight: 75,
          fat: 15,
          bmi: 23.1,
          lbm: 63.75,
          workoutLevel: 'intermediate',
          workoutGoal: 'muscle',
          daysPerWeek: 4
        }
      },
      'prueba': {
        password: btoa('1234'),
        created: new Date().toISOString(),
        profile: {
          name: 'Usuario Prueba',
          age: 30,
          gender: 'M',
          height: 175,
          weight: 80,
          fat: 20,
          bmi: 26.1,
          lbm: 64,
          workoutLevel: 'beginner',
          workoutGoal: 'fitness',
          daysPerWeek: 3
        }
      },
      'admin': {
        password: btoa('admin123'),
        created: new Date().toISOString(),
        profile: {
          name: 'Administrador',
          age: 35,
          gender: 'M',
          height: 178,
          weight: 85,
          fat: 18,
          bmi: 26.9,
          lbm: 69.7,
          workoutLevel: 'advanced',
          workoutGoal: 'strength',
          daysPerWeek: 5
        }
      }
    };
    
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }
}

// Verificar si hay sesión activa
function checkSession() {
  const session = localStorage.getItem('currentSession');
  if (session) {
    currentUser = JSON.parse(session);
  } else {
    const guestSession = localStorage.getItem('guestSession');
    if (guestSession) {
      isGuest = true;
    }
  }
}

// Registrar nuevo usuario
function registerUser(username, password) {
  if (!username || !password) {
    return { success: false, message: 'Usuario y contraseña requeridos' };
  }

  if (username.length < 3) {
    return { success: false, message: 'Usuario debe tener mínimo 3 caracteres' };
  }

  if (password.length < 4) {
    return { success: false, message: 'Contraseña debe tener mínimo 4 caracteres' };
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (users[username]) {
    return { success: false, message: 'Usuario ya existe' };
  }

  users[username] = {
    password: btoa(password),
    created: new Date().toISOString(),
    profile: {
      name: username,
      age: null,
      gender: '',
      height: null,
      weight: null,
      fat: null,
      bmi: null,
      lbm: null,
      workoutLevel: '',
      workoutGoal: '',
      daysPerWeek: null
    }
  };

  localStorage.setItem('users', JSON.stringify(users));
  return { success: true, message: 'Usuario registrado exitosamente' };
}

// Iniciar sesión
function loginUser(username, password) {
  if (!username || !password) {
    return { success: false, message: 'Usuario y contraseña requeridos' };
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};

  if (!users[username]) {
    return { success: false, message: 'Usuario no existe' };
  }

  if (users[username].password !== btoa(password)) {
    return { success: false, message: 'Contraseña incorrecta' };
  }

  const session = {
    username: username,
    loginTime: new Date().toISOString(),
    profile: users[username].profile
  };

  localStorage.setItem('currentSession', JSON.stringify(session));
  currentUser = session;
  isGuest = false;
  localStorage.removeItem('guestSession');

  return { success: true, message: 'Sesión iniciada' };
}

// Iniciar como invitado
function loginGuest() {
  localStorage.setItem('guestSession', 'true');
  isGuest = true;
  currentUser = null;
  return { success: true, message: 'Ingreso como invitado' };
}

// Cerrar sesión
function logout() {
  try {
    // Limpiar datos temporales de sesión anterior si existían
    if (currentUser) {
      localStorage.removeItem(`temp_calendar_${currentUser.username}`);
      localStorage.removeItem(`temp_progress_${currentUser.username}`);
      localStorage.removeItem(`temp_mentality_${currentUser.username}`);
    }
    
    localStorage.removeItem('currentSession');
    localStorage.removeItem('guestSession');
    currentUser = null;
    isGuest = false;
    
    // Intentar renderizar UI si existe headerRight
    try {
      renderSessionUI();
    } catch (e) {
      console.log('HeaderRight no disponible, redirigiendo...');
    }
    
    // Mostrar notificación si la función existe
    try {
      showNotification('Sesión cerrada', 'info');
    } catch (e) {
      console.log('ShowNotification no disponible');
    }
    
    // Redirigir a inicio después de 500ms
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 500);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Forzar redireccionamiento incluso si hay error
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  }
}

// Obtener usuario actual
function getCurrentUser() {
  return currentUser;
}

// Verificar si está autenticado (no guest)
function isAuthenticated() {
  return currentUser !== null;
}

// Verificar si es guest
function isGuestUser() {
  return isGuest;
}

// Renderizar UI de sesión en el header
function renderSessionUI() {
  const headerRight = document.getElementById('headerRight');
  if (!headerRight) return;

  let html = '<div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">';
  
  // Logo
  html += '<div style="font-size:24px; font-weight:800; color:#00ffc8; letter-spacing:2px; margin-right:15px;">SF</div>';

  if (isAuthenticated()) {
    html += `<span style="font-size:12px; color:#00d4ff; min-width:80px;">👤 ${currentUser.username}</span>`;
    html += '<button class="nav-btn" onclick="openProfile()">👤 Perfil</button>';
    html += '<button class="nav-btn" onclick="logout()">🚪 Salir</button>';
    html += '<button class="nav-btn" onclick="location.href=\'index.html\'">🏠 Inicio</button>';
  } else if (isGuest) {
    html += '<span style="font-size:12px; color:#00d4ff;">👻 Invitado</span>';
    html += '<button class="nav-btn" onclick="openLoginModal()">🔐 Iniciar Sesión</button>';
    html += '<button class="nav-btn" onclick="location.href=\'index.html\'">🏠 Inicio</button>';
  } else {
    html += '<button class="nav-btn" onclick="openLoginModal()">🔐 Iniciar Sesión</button>';
    html += '<button class="nav-btn" onclick="openRegisterModal()">✍️ Registrarse</button>';
    html += '<button class="nav-btn" onclick="location.href=\'index.html\'">🏠 Inicio</button>';
  }

  html += '</div>';
  headerRight.innerHTML = html;
}

// Guardar perfil del usuario
function saveUserProfile(profileData) {
  if (!isAuthenticated()) {
    return { success: false, message: 'Debes iniciar sesión' };
  }

  const users = JSON.parse(localStorage.getItem('users')) || {};
  users[currentUser.username].profile = { ...users[currentUser.username].profile, ...profileData };
  localStorage.setItem('users', JSON.stringify(users));

  const session = { ...currentUser, profile: users[currentUser.username].profile };
  localStorage.setItem('currentSession', JSON.stringify(session));
  currentUser = session;

  return { success: true, message: 'Perfil actualizado' };
}

// Obtener perfil del usuario
function getUserProfile() {
  if (isAuthenticated()) {
    return currentUser.profile || {};
  }
  return {};
}

// Mostrar notificación
function showNotification(message, type = 'success') {
  let notif = document.getElementById('globalNotif');
  if (!notif) {
    notif = document.createElement('div');
    notif.id = 'globalNotif';
    notif.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #00ffc8, #00d4ff);
      color: black;
      padding: 16px 24px;
      border-radius: 10px;
      font-weight: 600;
      z-index: 1000;
      box-shadow: 0 8px 24px rgba(0, 255, 200, 0.4);
      display: none;
    `;
    document.body.appendChild(notif);
  }

  notif.textContent = message;
  notif.style.display = 'block';
  setTimeout(() => notif.style.display = 'none', 3000);
}

// Abrir modal de login
function openLoginModal() {
  let modal = document.getElementById('loginModal');
  if (!modal) {
    modal = createLoginModal();
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
  document.getElementById('loginUsername').focus();
}

// Abrir modal de registro
function openRegisterModal() {
  let modal = document.getElementById('registerModal');
  if (!modal) {
    modal = createRegisterModal();
    document.body.appendChild(modal);
  }
  modal.style.display = 'flex';
  document.getElementById('registerUsername').focus();
}

// Crear modal de login
function createLoginModal() {
  const modal = document.createElement('div');
  modal.id = 'loginModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 500;
    backdrop-filter: blur(5px);
    overflow-y: auto;
  `;

  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, rgba(20, 30, 40, 0.98), rgba(10, 10, 20, 0.98)); padding: 30px; border-radius: 18px; max-width: 400px; width: 90%; border: 1px solid rgba(0, 255, 200, 0.2); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8); margin: auto;">
      <h2 style="color: #00ffc8; margin-top: 0; text-align: center;">🔐 Iniciar Sesión</h2>
      
      <div style="margin: 20px 0;">
        <label style="display: block; color: #00ffc8; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Usuario</label>
        <input type="text" id="loginUsername" placeholder="Tu usuario" style="width: 100%; padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 255, 200, 0.2); background: rgba(10, 10, 20, 0.8); color: white; font-family: inherit; font-size: 13px;" />
      </div>

      <div style="margin: 20px 0;">
        <label style="display: block; color: #00ffc8; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Contraseña</label>
        <input type="password" id="loginPassword" placeholder="Tu contraseña" style="width: 100%; padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 255, 200, 0.2); background: rgba(10, 10, 20, 0.8); color: white; font-family: inherit; font-size: 13px;" />
      </div>

      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <button onclick="performLogin()" style="flex: 1; padding: 11px; background: linear-gradient(135deg, #00ffc8, #00c8ff); color: black; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px;">Entrar</button>
        <button onclick="document.getElementById('loginModal').style.display='none'; loginGuest(); renderSessionUI(); showNotification('Sesión de invitado activada', 'success');" style="flex: 1; padding: 11px; background: rgba(0, 255, 200, 0.1); color: white; border: 1px solid rgba(0, 255, 200, 0.2); border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px;">👻 Invitado</button>
      </div>

      <div style="text-align: center; margin-top: 15px;">
        <button onclick="document.getElementById('loginModal').style.display='none'; openRegisterModal();" style="background: none; border: none; color: #00d4ff; cursor: pointer; font-weight: 600; font-size: 12px; text-decoration: underline;">¿No tienes cuenta? Regístrate</button>
      </div>

      <button onclick="document.getElementById('loginModal').style.display='none';" style="position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #ff3333, #ff0000); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">✕</button>
    </div>
  `;

  return modal;
}

// Crear modal de registro
function createRegisterModal() {
  const modal = document.createElement('div');
  modal.id = 'registerModal';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.92);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 500;
    backdrop-filter: blur(5px);
    overflow-y: auto;
  `;

  modal.innerHTML = `
    <div style="background: linear-gradient(135deg, rgba(20, 30, 40, 0.98), rgba(10, 10, 20, 0.98)); padding: 30px; border-radius: 18px; max-width: 400px; width: 90%; border: 1px solid rgba(0, 255, 200, 0.2); box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8); margin: auto;">
      <h2 style="color: #00ffc8; margin-top: 0; text-align: center;">✍️ Crear Cuenta</h2>
      
      <div style="margin: 20px 0;">
        <label style="display: block; color: #00ffc8; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Usuario (mínimo 3 caracteres)</label>
        <input type="text" id="registerUsername" placeholder="Tu usuario" style="width: 100%; padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 255, 200, 0.2); background: rgba(10, 10, 20, 0.8); color: white; font-family: inherit; font-size: 13px;" />
      </div>

      <div style="margin: 20px 0;">
        <label style="display: block; color: #00ffc8; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Contraseña (mínimo 4 caracteres)</label>
        <input type="password" id="registerPassword" placeholder="Tu contraseña" style="width: 100%; padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 255, 200, 0.2); background: rgba(10, 10, 20, 0.8); color: white; font-family: inherit; font-size: 13px;" />
      </div>

      <div style="margin: 20px 0;">
        <label style="display: block; color: #00ffc8; font-weight: 600; margin-bottom: 8px; font-size: 13px;">Repetir Contraseña</label>
        <input type="password" id="registerPasswordConfirm" placeholder="Confirma tu contraseña" style="width: 100%; padding: 11px; border-radius: 8px; border: 1px solid rgba(0, 255, 200, 0.2); background: rgba(10, 10, 20, 0.8); color: white; font-family: inherit; font-size: 13px;" />
      </div>

      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <button onclick="performRegister()" style="flex: 1; padding: 11px; background: linear-gradient(135deg, #00ffc8, #00c8ff); color: black; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 13px;">Crear Cuenta</button>
      </div>

      <div style="text-align: center; margin-top: 15px;">
        <button onclick="document.getElementById('registerModal').style.display='none'; openLoginModal();" style="background: none; border: none; color: #00d4ff; cursor: pointer; font-weight: 600; font-size: 12px; text-decoration: underline;">¿Ya tienes cuenta? Inicia sesión</button>
      </div>

      <button onclick="document.getElementById('registerModal').style.display='none';" style="position: absolute; top: 15px; right: 15px; background: linear-gradient(135deg, #ff3333, #ff0000); color: white; border: none; width: 40px; height: 40px; border-radius: 50%; font-size: 24px; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4);">✕</button>
    </div>
  `;

  return modal;
}

// Ejecutar login
function performLogin() {
  const usernameInput = document.getElementById('loginUsername');
  const passwordInput = document.getElementById('loginPassword');
  
  if (!usernameInput || !passwordInput) {
    console.error('Elementos de login no encontrados');
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) {
    showNotification('Por favor completa todos los campos', 'error');
    return;
  }

  const result = loginUser(username, password);
  console.log('Login result:', result);
  showNotification(result.message);

  if (result.success) {
    setTimeout(() => {
      const loginModal = document.getElementById('loginModal');
      if (loginModal) loginModal.style.display = 'none';
      renderSessionUI();
      location.reload();
    }, 1000);
  }
}

// Ejecutar registro
function performRegister() {
  const usernameInput = document.getElementById('registerUsername');
  const passwordInput = document.getElementById('registerPassword');
  const passwordConfirmInput = document.getElementById('registerPasswordConfirm');

  if (!usernameInput || !passwordInput || !passwordConfirmInput) {
    console.error('Elementos de registro no encontrados');
    return;
  }

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;

  if (!username || !password || !passwordConfirm) {
    showNotification('Por favor completa todos los campos', 'error');
    return;
  }

  if (password !== passwordConfirm) {
    showNotification('Las contraseñas no coinciden', 'error');
    return;
  }

  const result = registerUser(username, password);
  console.log('Register result:', result);
  showNotification(result.message);

  if (result.success) {
    setTimeout(() => {
      const registerModal = document.getElementById('registerModal');
      if (registerModal) registerModal.style.display = 'none';
      openLoginModal();
    }, 1000);
  }
}

// Abrir perfil
function openProfile() {
  location.href = 'perfil.html';
}

// Verificar acceso a funcionalidades
function checkAccess(requireLogin = false) {
  if (requireLogin && !isAuthenticated() && !isGuest) {
    showNotification('Debes iniciar sesión o entrar como invitado', 'error');
    setTimeout(() => openLoginModal(), 500);
    return false;
  }

  if (!isAuthenticated() && !isGuest) {
    showNotification('Acceso restringido. Inicia sesión o entra como invitado', 'error');
    setTimeout(() => openLoginModal(), 500);
    return false;
  }

  return true;
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', initAuth);
