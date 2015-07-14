json.array! dir do |d|
  json.set! :text, d.name
  json.set! :id, d.id
  if d.children
    json.children d.children do |child|
      json.text child.name
      json.id child.id
    end
  end
end