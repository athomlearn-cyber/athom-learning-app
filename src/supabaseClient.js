import { createClient } from '@supabase/supabase-js';

// Reemplaza con tus credenciales reales de Supabase
const SUPABASE_URL = 'https://banojzotfsgexogadzmr.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Vmpd0lo_UW86VlL0KFMNfA_uzLVKd8H';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);