import {Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany,ManyToMany,JoinTable,Generated} from "typeorm";
import {Module} from './Module';
import {Method} from "./Method";
import {Interface} from './Interface';
import {ClassPojo} from'../../pojo';
import { Base } from './Base';

@Entity()
export class Class extends Base {
    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.classes)
    public module?: Module;

    @ManyToOne(type => Class, class_ => class_.subClasses, { nullable: true })
    public superClass?: Class;

    @OneToMany(type => Class, class_ => class_.superClass)
    public subClasses?: Class[];

    @ManyToMany(type => Interface, { cascade:true})
    @JoinTable()
    public implements?: Interface[]


    @OneToMany(type => Method, method => method.classProperty)
    public methods?: Method[];

    @Column({name: "astnode", type: "jsonb", nullable: true})
    public astNode?: any;

    @Column({name: "superclassnode", type: "jsonb", nullable: true})
    public superClassNode?: any;

    @Column({name: "implementsnode", type: "jsonb", nullable: true})
    public implementsNode?: any;

    public constructor(module: Module, name: string, methods: Method[], subclasses: Class[]) {
    super();
        this.module = module;
        this.name = name;
        this.methods = methods;
        this.subClasses = subclasses;
    }


    public toPojo(): ClassPojo {
        return { id:this.id,
            uuid: this.uuid,
            superClass:this.superClass ? this.superClass.toPojo() : undefined,
            implements:this.implements ? this.implements.map(i => i.toPojo()) : undefined,
            name: this.name,
            methods: this.methods? this.methods.map(m => m.toPojo()):undefined,
            astNode:this.astNode,
            superClassNode:this.superClassNode,
            implementsNode: this.implementsNode,
        }
    }

    public toString(): string {
        return `<Class module=${this.module || this.moduleId} name=${this.name}/>`;
    }

}
