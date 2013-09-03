set :css_dir, 'css'
set :js_dir, 'js'

# for relative links
#activate :relative_assets
#set :relative_links, true

configure :development do
  set :debug_assets, true
end

configure :build do
  activate :minify_javascript
end
