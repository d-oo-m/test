require 'pathname'
class Scaner
  def start path, parent_id=0
    root = Pathname.new(path)
    root.children.each_with_index do |item, index|
      if item.directory? 
        saved_item = Item.create(:name => File.basename(item), :item_type => "dir", :parent_id => parent_id, :position => index )
        start(item, saved_item.id) if item.directory?
      elsif item.file?
        saved_item = Item.create(:name => File.basename(item), :item_type => "file", :parent_id => parent_id, :position => index )
      end
    end
  end
end