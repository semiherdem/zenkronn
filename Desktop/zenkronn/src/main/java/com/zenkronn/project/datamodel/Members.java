package com.zenkronn.project.datamodel;

// default package
// Generated Dec 13, 2017 10:39:14 AM by Hibernate Tools 5.2.6.Final

/**
 * Members generated by hbm2java
 */
public class Members implements java.io.Serializable {

	private Integer id;
	private String name;
	private String surname;
	private String username;

	public Members() {
	}

	public Members(String name, String surname, String username) {
		this.name = name;
		this.surname = surname;
		this.username = username;
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return this.surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}
