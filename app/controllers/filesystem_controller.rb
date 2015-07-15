require 'scaner'
class FilesystemController < ApplicationController
  def scan
    Item.all.each{|i| i.delete}

    Scaner.new.start Pathname.new(Rails.root)
  end

  def index
    @dir = params[:t] ? Item.where(item_type:'file', :parent_id => params[:parent]) : Item.where(item_type:'dir', :parent_id => 0)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def update
    Item.update(params[:id], :name => params[:name])   
    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

  def update_pos

    if params[:t] == "dir"
      @items = Item.where(parent_id: (Item.find(params[:id]).parent_id), item_type:"dir")
    elsif params[:t] == "file"
      @items = Item.where(parent_id: (Item.find(params[:id]).parent_id), item_type:"file")
    end

    @items.all.each{|i| puts i.name}

    puts "new_position"+params[:new_position].to_s
    puts "old_position"+params[:old_position].to_s

    pos = []

    @items.all.each_with_index do |i, index|
      pos[index]=i.position
      puts pos[index]
    end

    @items.all.each_with_index do |i, index|
      if params[:new_position] == index.to_s
        puts "-"+index.to_s
        puts params[:new_position]
        i.update(id: i.id, :position => pos[params[:old_position].to_i]) #updated with old position
        puts "Updated node:"
        puts i.name, i.position, i.id
      end
    end
    
    @items.all.each_with_index do |i, index|
      if params[:old_position] == index.to_s
        # puts "AAAAAA"
        i.update(id: i.id, :position => pos[params[:new_position].to_i])
        puts "Updated node:"
        puts i.name, i.position, i.id
      end
    end

    render :nothing => true, :status => 200, :content_type => 'text/html'
  end

end
