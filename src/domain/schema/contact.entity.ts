import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("contact")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "name",
    type: "text",
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    name: "email",
    type: "text",
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: "phone",
    type: "text",
    nullable: false,
    unique: true,
  })
  phone: string;

  @Column({ name: "type", type: "text", nullable: false })
  type: string;

  @Column({
    name: "cpf_cnpj",
    type: "text",
    nullable: false,
    unique: true,
  })
  cpfCnpj: string;

  @Column({
    name: "status",
    type: "text",
    default: "ativo",
    nullable: false,
    unique: false,
  })
  status: string;

  @CreateDateColumn({ name: "dt_created_at", type: "date", nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "dt_updated_at", type: "date", nullable: false })
  updatedAt: Date;

  constructor(
    name: string,
    email: string,
    phone: string,
    cpfCnpj: string,
    status: string
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.cpfCnpj = cpfCnpj;
    this.type = cpfCnpj?.length === 11 ? "PF" : "PJ";
    this.status = status;
  }
}
