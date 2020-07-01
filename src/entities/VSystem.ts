import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("key", ["key"], { unique: true })
@Entity("v_system", { schema: "v_admin" })
export class VSystem {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "自增id",
    unsigned: true,
  })
  id: number;

  @Column("varchar", {
    name: "key",
    unique: true,
    comment: "配置key",
    length: 50,
  })
  key: string;

  @Column("text", { name: "value", comment: "配置值" })
  value: string;

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
}
