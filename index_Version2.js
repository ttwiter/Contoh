import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://oaatowhxrefpjlwucvvg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hYXRvd2h4cmVmcGpsd3VjdnZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg0MzgzMDQsImV4cCI6MjA2NDAxNDMwNH0.-Qf6y5JiWVx2P6kYfWv5mQxEEnF7YdFgqT9E4p0jF1g'
const supabase = createClient(supabaseUrl, supabaseKey)

async function loadSlides() {
  const { data, error } = await supabase
    .from('slides')
    .select('*')
    .order('created_at', { ascending: false })
  const container = document.getElementById('slidePromoList')
  if (error) {
    container.innerHTML = `<div style="color:red;">Error: ${error.message}</div>`
    return
  }
  container.innerHTML = !data.length ? "<i>Belum ada slide promosi.</i>" :
    data.map(s => `
      <div class="slide-item">
        <b>${s.title}</b><br>
        <div>${s.desc}</div>
        <small>${new Date(s.created_at).toLocaleString()}</small>
      </div>
    `).join('')
}

loadSlides()