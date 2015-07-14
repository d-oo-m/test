$(function (){ 

  function scan() {
        $.get( "/scan", function(data) {
            alert( "Scan was performed." );
        });
    }   

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
          "plugins": ["search", "wholerow", "dnd", "checkbox", "types","json_data", "ui", "crrm"],
          "move_node":"true"
        });

  $('#jstree_json_dirs').on("move_node.jstree", function(node, parent, position, old_parent, old_position, is_multi, old_instance, new_instance){
  console.log(node);
  console.log(parent);
  console.log(position);
  console.log(old_parent);
  }); 


  $('#jstree_json_dirs').on("select_node.jstree", function(node, selected, e){
    console.log(selected.node.id);
    $('#jstree_json_files').jstree("destroy");
    $('#jstree_json_files').jstree(        {
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
          "plugins": ["contextmenu","state","search", "wholerow", "dnd", "checkbox", "types","json_data", "ui", "crrm"],
          "move_node":"true"
        });  



    // console.log(selected.node.id);
  })


  });

