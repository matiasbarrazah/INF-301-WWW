import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { RegisterForm } from '../types';
import './Auth.css';

const REGIONS = ['Región Metropolitana', 'Valparaíso', 'Biobío', 'Araucanía', 'Los Lagos'];

const INITIAL: RegisterForm = {
  run: '', fullName: '', email: '', confirmEmail: '',
  password: '', confirmPassword: '', phone: '',
  address: '', commune: '', province: '', region: '',
  birthDate: '', gender: 'M',
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<RegisterForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const set = (field: keyof RegisterForm) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = (): boolean => {
    const errs: Partial<RegisterForm> = {};
    if (!form.run) errs.run = 'Requerido';
    if (!form.fullName) errs.fullName = 'Requerido';
    if (!form.email) errs.email = 'Requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Correo inválido';
    if (form.email !== form.confirmEmail) errs.confirmEmail = 'Los correos no coinciden';
    if (!form.password || form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.phone) errs.phone = 'Requerido';
    if (!form.address) errs.address = 'Requerido';
    if (!form.commune) errs.commune = 'Requerido';
    if (!form.region) errs.region = 'Requerido';
    if (!form.birthDate) errs.birthDate = 'Requerido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await register({ ...form });
    setLoading(false);
    setSuccess(true);
    setTimeout(() => navigate('/'), 1500);
  };

  return (
    <main className="auth-page auth-page--wide">
      <div className="auth-card auth-card--wide card">
        <div className="auth-card__header">
          <span className="auth-card__icon">📝</span>
          <h1>Crear cuenta</h1>
          <p>Regístrate para hacer tus pedidos en línea</p>
        </div>

        {success && <div className="alert alert-success">¡Registro exitoso! Redirigiendo…</div>}

        <form onSubmit={handleSubmit} noValidate className="register-form">
          <h3>Datos personales</h3>
          <div className="register-grid">
            <div className="form-group">
              <label>RUN</label>
              <input value={form.run} onChange={set('run')} placeholder="12.345.678-9" />
              {errors.run && <span className="error">{errors.run}</span>}
            </div>
            <div className="form-group">
              <label>Nombre completo</label>
              <input value={form.fullName} onChange={set('fullName')} placeholder="María González" />
              {errors.fullName && <span className="error">{errors.fullName}</span>}
            </div>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input type="email" value={form.email} onChange={set('email')} placeholder="correo@ejemplo.cl" />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label>Confirmar correo</label>
              <input type="email" value={form.confirmEmail} onChange={set('confirmEmail')} placeholder="correo@ejemplo.cl" />
              {errors.confirmEmail && <span className="error">{errors.confirmEmail}</span>}
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" value={form.password} onChange={set('password')} placeholder="••••••••" />
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label>Confirmar contraseña</label>
              <input type="password" value={form.confirmPassword} onChange={set('confirmPassword')} placeholder="••••••••" />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input value={form.phone} onChange={set('phone')} placeholder="+56912345678" />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input type="date" value={form.birthDate} onChange={set('birthDate')} />
              {errors.birthDate && <span className="error">{errors.birthDate}</span>}
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select value={form.gender} onChange={set('gender')}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <h3 style={{ marginTop: '1.5rem' }}>Dirección de despacho</h3>
          <div className="register-grid">
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label>Dirección</label>
              <input value={form.address} onChange={set('address')} placeholder="Av. Pajaritos 1234, Dpto 5B" />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <div className="form-group">
              <label>Comuna</label>
              <input value={form.commune} onChange={set('commune')} placeholder="Maipú" />
              {errors.commune && <span className="error">{errors.commune}</span>}
            </div>
            <div className="form-group">
              <label>Provincia</label>
              <input value={form.province} onChange={set('province')} placeholder="Santiago" />
            </div>
            <div className="form-group">
              <label>Región</label>
              <select value={form.region} onChange={set('region')}>
                <option value="">Selecciona…</option>
                {REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              {errors.region && <span className="error">{errors.region}</span>}
            </div>
          </div>

          <button className="btn btn-primary auth-card__submit" type="submit" disabled={loading}>
            {loading ? 'Registrando…' : 'Crear cuenta'}
          </button>
        </form>

        <hr className="divider" />
        <p className="auth-card__footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </main>
  );
}
