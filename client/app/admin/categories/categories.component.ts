import {FormGroup, Validators, FormBuilder, FormControl }from '@angular/forms';
import {MatSnackBar }from '@angular/material';
import {CrudService }from './../../shared/services/crud.service';
import {ModalService }from './../../modal/modal.service';
import {Component, OnInit }from '@angular/core';
import {TreeNode, TREE_ACTIONS, KEYS, IActionMapping }from 'angular-tree-component';
import {remove }from 'lodash';
import {Cookie }from 'ng2-cookies/ng2-cookies';
import {AuthService }from './../../shared/services/auth.service';
@Component( {
  selector:'salientink-categories',
  templateUrl:'./categories.component.html',
  styleUrls:['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories:Array < any > ;
  nodes:any[];
  user:any;
  isPrivateVendor:boolean=false;
  nodes2 = [ {name:'root'},  {name:'root2'}];
  public filterText:string = '';
  public addText:string = '';
  public form:FormGroup;
  public form1:FormGroup;
  public filterInput = new FormControl();
  public addInput = new FormControl();
  showAdd:boolean;
  showFilter:boolean;
  constructor(private auth:AuthService, private crud:CrudService, private snack:MatSnackBar, private fb:FormBuilder, private modal:ModalService) {
    this.form = this.fb.group( {
      name:['', [Validators.required]],
      allocatedValue:[0, []],
    });
  }

  ngOnInit() {
    this.getCurrentuserId()
    if (this.user && this.user.role === 'privatevendor') {
      this.crud.get('categories/allPrivateVendorCategories',{parentID : this.user._id}).subscribe(data =>
          {this.categories = data; });
         }
      else {
        this.crud.get('categories').subscribe(data =>  {this.categories = data; });
      }
  }

  getCurrentuserId() {
    const token = localStorage.getItem('id_token') || Cookie.get('token'); //Cookies set through auth strategy
          if (token && token !== 'null') {
              this.user = this.auth.decodeUserFromToken(token);
              this.checkIsPrivateVendor();
          }

  }

  checkIsPrivateVendor(){
    if(this.user && this.user.role === 'privatevendor'){
      this.isPrivateVendor=true;
    }else{
      this.isPrivateVendor=false;
    }
  }
  asyncChildren = [];

  addNode(data, tree) {
    let itemObject={};
    if(this.user.role ==='privatevendor'){
      itemObject={name:data.name ,isglobal :false,parentID :this.user._id ,allocatedVal :data.allocatedValue }
      this.categories.push( {
        name:data.name
      });
      tree.update();
      this.crud.post('categories/vendorCreate',  itemObject).subscribe(data =>  {
        this.crud.get('categories/allPrivateVendorCategories',{parentID : this.user._id}).subscribe(data =>  {this.categories = data; });
      });
    }
    else{
      itemObject={name:data.name ,isglobal :true,parentID :null  ,allocatedVal :0}
      this.categories.push( {
        name:data.name
      });
      tree.update();
      this.crud.post('categories',  itemObject).subscribe(data =>  {
        this.crud.get('categories').subscribe(data =>  {this.categories = data; });
      });
    }

  }
  removeNode(node:TreeNode, tree) {
    let vm = this;
    if (node.isRoot) {
      this.snack.open('Parent Node can not be removed', 'OK',  {duration:2000 });
    }
    else {
      vm.modal.confirm('Delete?', 'Are you sure to delete')
        .subscribe(res =>  {
          if (res) {
            remove(node.parent.data.children, node.data);
            this.crud.delete('categories', node.data._id).subscribe(data =>  {}, err =>  {
              this.snack.open(err, 'OK',  {duration:2000 });
            })
          }
        })
    }
    tree.update();
  }
  childrenCount(node:TreeNode):string {
    return (node && node.children) ? this.StringConverter(node.children.length):'';
  }
  StringConverter = (value: any) => {
    if (value === null || value === undefined || typeof value === "string")
        return value;

    return value.toString();
}
  filterNodes(text, tree) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree) {
    tree.treeModel.getNodeById(1001)
      .setActiveAndVisible();
  }
  moveNode($event) {
    this.crud.put('categories', $event.treeModel.nodes).subscribe();
  }
  customTemplateStringOptions =  {
    isExpandedField:'expanded',
    idField:'_id',
    nodeHeight:23,
    allowDrag:true,
    useVirtualScroll:true,
  }
  onEvent(event) {
    if (event.eventName === 'onUpdateData') {
    }
  }

  go($event) {
    $event.stopPropagation();
    alert('this method is on the app component');
  }

  activeNodes(treeModel) {
    //console.log(treeModel.activeNodes);
  }
  mouse(event, show) {
    show?$(event.target).children('button').css('visibility', 'visible'):$(event.target).children('button').css('visibility', 'hidden');
  }
}
