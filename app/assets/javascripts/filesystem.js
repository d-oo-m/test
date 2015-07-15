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
      },
      'check_callback':true
    },
    "plugins": ["contextmenu", "crrm", "dnd", "json_data", "state", "types", "search", "ui", "wholerow"],
  });

    $('#jstree_json_files').jstree(
  {
    'core' : {
      'data' : {
        "url" : "index?t=file&parent=0",
        "dataType" : "json",
      },
      'check_callback':true
    },
    "plugins": ["contextmenu", "crrm", "dnd", "json_data", "state", "types", "search", "ui", "wholerow"],
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
        },
        'check_callback' : true,
      },
      "plugins": ["contextmenu", "crrm", "dnd", "json_data", "state", "types", "search", "ui", "wholerow"],
    });
  })
});

