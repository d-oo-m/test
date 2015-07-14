$(function (){  

  $('#scan_btn').click(function (event) {   
    event.preventDefault();    
    $.ajax(
      { url: "scan",
      type: "GET" });
    $('#jstree_json_dirs').jstree("refresh");
    $('#jstree_json_files').jstree("refresh");   
  });

  $('#jstree_json_dirs').jstree(
  {
    'core' : {
      'data' : {
        "url" : "index",
        "dataType" : "json",
        "move_node":"true",
        "rename_node":"true"
      },
      'check_callback':true
    },
    "plugins": ["search", "contextmenu", "wholerow", "dnd", "checkbox", "types","json_data", "ui", "crrm"],
    "move_node":"true",
    "rename_node":"true"
  });

  $('#jstree_json_dirs').on("move_node.jstree", function(node, parent, position, old_parent, old_position, is_multi, old_instance, new_instance){
    console.log(node);
    console.log(parent);
    console.log(position);
    console.log(old_parent);
    $.ajax({
     type:'GET', 
     url: 'update',
     dataType: 'json',
     data: $.param({id: text.node.id, name: text.text})
   });
  });

  $('#jstree_json_dirs').on("rename_node.jstree", function(node, text, old){
    console.log(text.node.id);
    $.ajax({
     type:'GET', 
     url: 'update',
     dataType: 'json',
     data: $.param({id: text.node.id, name: text.text})
   });
  });

  $('#jstree_json_files').on("rename_node.jstree", function(node, text, old){
    console.log(text.node.id);
    $.ajax({
     type:'GET', 
     url: 'update',
     dataType: 'json',
     data: $.param({id: text.node.id, name: text.text})
   });
  });


  $('#jstree_json_dirs').on("select_node.jstree", function(node, selected, e){
    console.log(selected.node.id);
    $('#jstree_json_files').jstree("destroy");
    $('#jstree_json_files').jstree( {
      'core' : {
        'animation':0,
        'data' : {
          "url" : "index?t=file&parent="+selected.node.id,
          "dataType" : "json",
          "move_node":"true",
          "rename_node":"true"
        },
        'check_callback' : true
      },
      "plugins": ["checkbox", "contextmenu", "crrm", "dnd", "json_data", "state", "types", "search", "ui", "wholerow"],
      "move_node":"true",
      "rename_node":"true"
    });
  })


});

