import {
  Column,
  CreateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("contactAddress")
export class ContactAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Contact, { onDelete: "CASCADE" })
  @JoinColumn()
  contact: Contact;

  @Column({ name: "zipcode", type: "text", nullable: false })
  zipcode: string;

  @Column({ name: "street", type: "text", nullable: false})
  street: string;

  @Column({ name: "number", type: "integer", nullable: false })
  number: number;

  @Column({ name: "complement", type: "text" })
  complement: string;

  @Column({ name: "district", type: "text", nullable: false })
  district: string;

  @Column({ name: "city", type: "text", nullable: false })
  city: string;

  @Column({ name: "state", type: "text", nullable: false })
  state: string;

  @CreateDateColumn({ name: "dt_created_at", nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: "dt_updated_at", nullable: false })
  updatedAt: Date;

  constructor(
    zipcode: string,
    street: string,
    number: string,
    complement: string,
    district: string,
    city: string,
    state: string,
    contact: Contact
  ) {
    this.zipcode = zipcode;
    this.street = street;
    this.number = Number(number);
    this.complement = complement;
    this.district = district;
    this.city = city;
    this.state = state;
    this.contact = contact;
  }
}
