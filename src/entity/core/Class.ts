/**
 * @uuid 85237724-bfd6-452c-9143-6f2615e67334
 */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    Generated,
    JoinColumn,
} from "typeorm";
import {Module} from './Module';
import {Method} from "./Method";
import {Interface} from './Interface';
import {ClassPojo} from'../../pojo';
import {PojoBuildArguments, PojoBuilder} from '../../types';
import { Base } from './Base';

/*
 * @uuid 9b797f3e-8328-416e-a474-1d282e780d07
*/
@Entity()
export class Class extends Base implements PojoBuilder<ClassPojo> {
    @Column()
    public moduleId?: number;

    @ManyToOne(type => Module, module => module.classes)
    @JoinColumn()
    public module?: Module;

    @Column({nullable: true})
    public superClassId?: number;

    @ManyToOne(type => Class, class_ => class_.subClasses, { nullable: true })
    @JoinColumn()
    public superClass?: Class;

    @OneToMany(type => Class, class_ => class_.superClass)
    @JoinTable()
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


    public toPojo(args?: PojoBuildArguments): ClassPojo {
        const minimal = args && args.minimal;
        return { id:this.id,
            module: this.module ? this.module.toPojo(args) : undefined,
            moduleId: this.moduleId,
            uuid: this.uuid,
            superClass:this.superClass ? this.superClass.toPojo() : undefined,
            implements:this.implements ? this.implements.map(i => i.toPojo()) : undefined,
            name: this.name,
            methods: this.methods? this.methods.map(m => m.toPojo()):undefined,
            astNode: minimal ? undefined : this.astNode,
            superClassNode:this.superClassNode,
            implementsNode: minimal ? undefined : this.implementsNode,
        }
    }

    public toString(): string {
        return `<Class module=${this.module || this.moduleId} name=${this.name}/>`;
    }

}
