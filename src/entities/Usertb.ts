import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("usertb", { schema: "v_admin" })
export class Usertb {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "主键ID",
    unsigned: true,
  })
  id: number;

  @Column("varchar", { name: "uname", comment: "名称", length: 30 })
  uname: string;

  @Column("int", { name: "age", comment: "年龄", default: () => "'0'" })
  age: number;

  @Column("timestamp", {
    name: "created_at",
    comment: "创建时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column("timestamp", {
    name: "updated_at",
    comment: "更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column("tinyint", {
    name: "STATUS",
    comment: "状态",
    unsigned: true,
    default: () => "'0'",
  })
  status: number;
}
