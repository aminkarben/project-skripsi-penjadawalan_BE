import { PrismaClient } from "@prisma/client";

const db = new PrismaClient()


export const createUser = async (data, hashedPassword) => {
    return await db.user.create({
        data: {
            password: hashedPassword,
            email: data.email,
            nama: data?.nama,
            telephone: data?.telephone,
        },
    })
}

export const cekEmailExist = async ({
    email
}) => {
    return await db.user.findFirst(
        {
            where: { email },
            include: {
                userRole: {
                    select: {
                        roleId: true,
                        role: {
                            select: {
                                nama: true
                            }
                        }
                    }
                }
            }
        })
};

export const getUserByRole = async (role) => {
    return await db.user.findMany({
        where: {
            userRole: {
                some: {
                    roleId: role
                }
            }
        },
        select: {
            id: true,
            email: true,
            nama: true,
            telephone: true,
        }
    })
}

export const cekUserByIds = async ({
    ids
}) => {
    return await db.user.count({
        where: {
            id: {
                in: ids
            }
        }
    })
}

export const getUserById = async ({
    id
}) => {
    return await db.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            nama: true,
            telephone: true,
            userRole: {
                select: {
                    role: {
                        select: {
                            nama: true
                        }
                    }
                }
            }
        }
    })
}

export const cekUserNotJoinKelas = async ({
    kelasId,
    ids
}) => {
    return await db.user.findMany({
        where: {
            classStudent: {
                none: {
                    classId: kelasId,
                    userId: {
                        in: ids
                    }
                }
            },
            userRole: {
                some: {
                    roleId: 3
                }
            },

        },
        select: {
            id: true,
            email: true,
            nama: true,
            telephone: true,
        }
    })
}