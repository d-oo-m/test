class Scaner
  def start path, parent=nil
    Dir.chdir(path)
    Dir.glob('*').each do |item|
      puts item
      puts item if File.directory?(item)
      start("#{path}/#{item}", item) if File.directory?(item) 
      puts "finish #{item}"
    end
  end
end