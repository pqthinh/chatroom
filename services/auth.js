function addUserToRoom({ roomId, listUser }) {
  return new Promise(async (resolve, reject) => {
    let conn = await db.getConnection();
    try {
      await conn.beginTransaction();
      let dataInsert = [];
      if (Array.isArray(listUser))
        listUser.map((u) => {
          dataInsert = [...dataInsert, [roomId, u]];
        });
      else dataInsert = [[roomId, listUser]];
      console.log(dataInsert);
      await conn.query("insert into room (roomId, idUser) values ?", [
        dataInsert,
      ]);
      await conn.commit();
      console.log(`Added user ${JSON.stringify(listUser)} to room ${roomId}`);
      resolve({ id: rows.insertId, roomId: roomId });
    } catch (err) {
      console.log(err);
      await conn.rollback();
      if (err) reject(false);
    } finally {
      await conn.release();
    }
  });
}