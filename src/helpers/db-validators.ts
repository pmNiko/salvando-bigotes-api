import Role from "../models/role.model";
import User from "../models/user.model";
import DocumentType from "../models/document-type.model";
import PetsTypes from "../models/pet-type.model";
import Pets from "../models/pet.model";

export const isValidRole = async (name = "") => {
  const existRole = await Role.findOne({ name });
  if (!existRole) {
    throw new Error(`Role ${name} is not valid`);
  }
};

export const isValidPetType = async (name = "") => {
  const existPetType = await PetsTypes.findOne({ name });
  if (!existPetType) {
    throw new Error(`Type ${name} is not valid`);
  }
};

export const existEmail = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already in use'`);
  }
};

export const existDocumentType = async (type = "") => {
  const existDocumentType = await DocumentType.findOne({ type });
  if (existDocumentType) {
    throw new Error(`Document Type ${type} already exist'`);
  }
};

export const existRole = async (name = "") => {
  const existRole = await Role.findOne({ name });
  if (existRole) {
    throw new Error(`Role ${name} already exist'`);
  }
};

export const existPetType = async (name = "") => {
  const existPetType = await PetsTypes.findOne({ name });
  if (existPetType) {
    throw new Error(`Pet Type ${name} already exist'`);
  }
};

export const existUserById = async (id = "") => {
  const existUser = await User.findById(id);
  if (!existUser) {
    throw new Error(`ID ${id} not exist'`);
  }
};

export const existDocumentTypeById = async (id = "") => {
  const existDocumentType = await DocumentType.findById(id);
  if (!existDocumentType) {
    throw new Error(`Document type: ${id} not exist'`);
  }
};

export const existRoleById = async (id = "") => {
  const existRole = await Role.findById(id);
  if (!existRole) {
    throw new Error(`Role: ${id} not exist'`);
  }
};

export const existPetsTypesById = async (id = "") => {
  const existPetType = await PetsTypes.findById(id);
  if (!existPetType) {
    throw new Error(`Pet Type: ${id} not exist'`);
  }
};

export const existPetById = async (id = "") => {
  const existPetType = await Pets.findById(id);
  if (!existPetType) {
    throw new Error(`Pet: ${id} not exist'`);
  }
};
