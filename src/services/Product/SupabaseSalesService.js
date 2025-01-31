import { createClient } from '@supabase/supabase-js';
import { SalesOperations } from '../operations/SalesOperations';
import { dbConfig } from '../../config/dbConfig';

class SupabaseSalesService extends SalesOperations {
  constructor() {
    super();
    this.supabase = createClient(dbConfig.supabase.url, dbConfig.supabase.key);
  }

  async create(data) {
    const { data: newSale, error } = await this.supabase.from('sales').insert([data]);
    if (error) throw error;
    return newSale[0].id;
  }

  async read(id) {
    const { data, error } = await this.supabase.from('sales').select().eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async update(id, data) {
    const { error } = await this.supabase.from('sales').update(data).eq('id', id);
    if (error) throw error;
  }

  async delete(id) {
    const { error } = await this.supabase.from('sales').delete().eq('id', id);
    if (error) throw error;
  }
}

export default SupabaseSalesService;
