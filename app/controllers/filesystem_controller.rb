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
end
