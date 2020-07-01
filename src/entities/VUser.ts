import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uniq_email", ["email"], { unique: true })
@Index("uniq_username", ["username"], { unique: true })
@Index("idx_phone", ["phone"], {})
@Entity("v_user", { schema: "v_admin" })
export class VUser {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "主键ID",
    unsigned: true,
  })
  id: number;

  @Column("varchar", {
    name: "username",
    unique: true,
    comment: "账号",
    length: 50,
  })
  username: string;

  @Column("varchar", { name: "password", comment: "密码", length: 100 })
  password: string;

  @Column("varchar", { name: "name", comment: "用户名称", length: 50 })
  name: string;

  @Column("varchar", {
    name: "email",
    unique: true,
    comment: "用户邮箱",
    length: 50,
  })
  email: string;

  @Column("varchar", { name: "phone", comment: "用户手机号", length: 11 })
  phone: string;

  @Column("text", { name: "address", comment: "用户地址" })
  address: string;

  @Column("tinyint", {
    name: "type",
    comment: "用户角色(0:超级管理员,1:管理员)",
    unsigned: true,
    default: () => "'1'",
  })
  type: number;

  @Column("tinyint", {
    name: "status",
    comment: "用户状态(0:正常,1:已禁用,2:已删除)",
    unsigned: true,
    default: () => "'0'",
  })
  status: number;

  @Column("varchar", { name: "avatar", comment: "用户头像", length: 128 })
  avatar: string;

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
